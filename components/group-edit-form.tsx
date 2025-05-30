"use client"

import type React from "react"

import { useState } from "react"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useAppContext } from "@/lib/app-context"
import type { Group } from "@/lib/types"

interface GroupEditFormProps {
  group: Group
  onClose: () => void
}

export function GroupEditForm({ group, onClose }: GroupEditFormProps) {
  const { updateGroup, isLoading } = useAppContext()
  const [name, setName] = useState(group.name)
  const [description, setDescription] = useState(group.description)
  const [isSettled, setIsSettled] = useState(group.isSettled)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateGroup(group.id, {
      name,
      description,
      isSettled,
    })

    onClose()
  }

  return (
    <Card className="fixed inset-0 z-50 m-auto h-fit max-h-[90vh] w-full max-w-md overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Group</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="settled" checked={isSettled} onCheckedChange={setIsSettled} />
            <Label htmlFor="settled">Mark as settled</Label>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Note: Marking a group as settled will prevent further expenses from being added.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

