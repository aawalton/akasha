"use client"

import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { MenuTabsTrigger } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { dialogDelete } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-delete.web-phrase.ts"
import { dialogSave } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-save.web-phrase.ts"
import { viewTabDeleteConfirm } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-delete-confirm.web-phrase.ts"
import { viewTabDeleteTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-delete-title.web-phrase.ts"
import { viewTabDuplicate } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-duplicate.web-phrase.ts"
import { viewTabNameLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-name-label.web-phrase.ts"
import { viewTabRename } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-rename.web-phrase.ts"
import { viewTabRenameTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/view-tab-rename-title.web-phrase.ts"
import type { ViewCallbacks } from "akasha/page/ui/modules/view-callbacks/view-callbacks.module.code.ts"
import { useEffect, useRef, useState } from "react"

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
  const phrase = usePhrase()
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
              {phrase(viewTabRename.slug)}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDuplicate}>
              {phrase(viewTabDuplicate.slug)}
            </DropdownMenuItem>
            {viewCount > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={() => setDeleteOpen(true)}>
                  {phrase(dialogDelete.slug)}
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
            <DialogTitle>{phrase(viewTabRenameTitle.slug)}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form id="rename-view-form" onSubmit={handleRename}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rv-name">{phrase(viewTabNameLabel.slug)}</Label>
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
              {phrase(dialogCancel.slug)}
            </Button>
            <Button
              variant="accent"
              type="submit"
              form="rename-view-form"
              disabled={name.trim() === ""}
            >
              {phrase(dialogSave.slug)}
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
            <DialogTitle>{phrase(viewTabDeleteTitle.slug)}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-secondary text-sm">
              {phrase(viewTabDeleteConfirm.slug, { name: view.name })}
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="tertiary" onClick={() => setDeleteOpen(false)}>
              {phrase(dialogCancel.slug)}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {phrase(dialogDelete.slug)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
