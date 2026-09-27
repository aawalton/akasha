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
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { dialogDelete } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-delete.web-phrase.ts"
import { navItemActionsLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-actions-label.web-phrase.ts"
import { navItemDeleteDescription } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-delete-description.web-phrase.ts"
import { navItemDeleteMenu } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-delete-menu.web-phrase.ts"
import { navItemDeleteTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-delete-title.web-phrase.ts"
import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"

const NAV_SLUG = "nav"

export function NavItemDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  const phrase = usePhrase()
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{phrase(navItemDeleteTitle.slug)}</AlertDialogTitle>
          <AlertDialogDescription>{phrase(navItemDeleteDescription.slug)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {phrase(dialogDelete.slug)}
          </AlertDialogAction>
          <AlertDialogCancel>{phrase(dialogCancel.slug)}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function NavItemActionsMenu({ onDelete }: { onDelete: () => void }) {
  const phrase = usePhrase()
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
            aria-label={phrase(navItemActionsLabel.slug)}
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
            {phrase(navItemDeleteMenu.slug)}
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
