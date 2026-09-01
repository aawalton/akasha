"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@akasha/design-primitives/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { useState } from "react"

interface CardActionsMenuProps {
  onDelete: () => void
  onDuplicate: () => void
  entityName: string
  deleteDisabledReason?: string
  preItems?: React.ReactNode
  extraItems?: React.ReactNode
}

export function CardActionsMenu({
  onDelete,
  onDuplicate,
  entityName,
  deleteDisabledReason,
  preItems,
  extraItems,
}: CardActionsMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-md text-secondary outline-none hover:bg-surface-2 hover:text-primary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Ellipsis className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onPointerDown={(e) => e.stopPropagation()}>
          {preItems}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
          >
            Duplicate
          </DropdownMenuItem>
          {extraItems}
          <DropdownMenuItem
            variant="destructive"
            disabled={deleteDisabledReason != null}
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteDialog(true)
            }}
          >
            {deleteDisabledReason ?? "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {entityName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this {entityName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              onDelete()
              setShowDeleteDialog(false)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
