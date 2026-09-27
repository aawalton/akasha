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
} from "akasha/design/interface/primitive/modules/alert-dialog/alert-dialog.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"

const NAV_SLUG = "nav"

export const NAV_ITEM_ACTIONS_LABEL = "Sidebar item actions"

export function NavItemDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Sidebar Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the item from the sidebar. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function NavItemActionsMenu({ onDelete }: { onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false)

  const keepOnPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const stopPointerPropagation = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={NAV_ITEM_ACTIONS_LABEL}
            className="rounded p-0.5 text-tertiary opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:hidden"
            onClick={keepOnPage}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onPointerDown={stopPointerPropagation}>
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              setConfirming(true)
            }}
          >
            <Trash2 className="size-4" />
            Delete…
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NavItemDeleteDialog
        open={confirming}
        onOpenChange={setConfirming}
        onConfirm={() => {
          setConfirming(false)
          onDelete()
        }}
      />
    </>
  )
}

export function NavItemActions({ pageId, href }: { pageId: string; href: string }) {
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
  const { pathname, push } = usePagesUIRouter()

  const handleDelete = async () => {
    const onDeletedPage = pathname === href || pathname.startsWith(`${href}/`)
    await runDelete({
      pageTypeSlug: NAV_SLUG,
      where: [{ key: "id", eq: pageId }],
    })
    if (onDeletedPage) push("/")
  }

  return (
    <NavItemActionsMenu
      onDelete={() => {
        void handleDelete()
      }}
    />
  )
}
