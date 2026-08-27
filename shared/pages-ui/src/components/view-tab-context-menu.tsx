"use client"

import { Icon } from "@shared/design-patterns/components/icon"
import { MenuTabsTrigger } from "@shared/design-patterns/components/tabs"
import { Button } from "@shared/design-primitives/components/button"
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@shared/design-primitives/components/dropdown-menu"
import { Input } from "@shared/design-primitives/components/input"
import { Label } from "@shared/design-primitives/components/label"
import { useEffect, useRef, useState } from "react"
import type { ViewCallbacks } from "../mutators/views"

export const VIEW_FALLBACK_ICON_NAME = "layout-list"

export interface ViewTabItem {
  id: string
  name: string
  iconName: string | null
}

interface ViewTabContextMenuProps {
  view: ViewTabItem
  viewCount: number
  mode?: "full" | "icon"
  callbacks: ViewCallbacks
}

export function ViewTabContextMenu({
  view,
  viewCount,
  mode = "full",
  callbacks,
}: ViewTabContextMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [name, setName] = useState(view.name)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!renameOpen) setName(view.name)
  }, [view.name, renameOpen])

  const handleDuplicate = () => {
    callbacks.onDuplicateView(view.id)
  }

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() === "" || name.trim() === view.name) {
      setRenameOpen(false)
      return
    }
    callbacks.onRenameView(view.id, name.trim())
    setRenameOpen(false)
  }

  const handleDelete = () => {
    callbacks.onDeleteView(view.id)
    setDeleteOpen(false)
  }

  return (
    <>
      <MenuTabsTrigger
        value={view.id}
        className="gap-2 overflow-hidden"
        menuContent={
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onSelect={() => {
                setName(view.name)
                setTimeout(() => setRenameOpen(true))
              }}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDuplicate}>Duplicate</DropdownMenuItem>
            {viewCount > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        }
      >
        <Icon name={view.iconName ?? VIEW_FALLBACK_ICON_NAME} className="size-4 shrink-0" />
        {mode === "full" && <span className="min-w-0 truncate text-left">{view.name}</span>}
      </MenuTabsTrigger>

      {}
      <Dialog
        open={renameOpen}
        onOpenChange={(v) => {
          setRenameOpen(v)
          if (!v) {
            setName(view.name)
          }
        }}
      >
        <DialogContent
          showCloseButton
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            nameInputRef.current?.focus()
            nameInputRef.current?.select()
          }}
        >
          <DialogHeader>
            <DialogTitle>Rename View</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form id="rename-view-form" onSubmit={handleRename}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rv-name">Name</Label>
                  <Input
                    id="rv-name"
                    ref={nameInputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") e.stopPropagation()
                    }}
                    required
                  />
                </div>
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button variant="tertiary" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              type="submit"
              form="rename-view-form"
              disabled={name.trim() === ""}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {}
      <Dialog
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v)
        }}
      >
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Delete View</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-secondary text-sm">
              Are you sure you want to delete &ldquo;{view.name}&rdquo;? This cannot be undone.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="tertiary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
