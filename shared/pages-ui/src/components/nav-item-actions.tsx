"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@shared/design-primitives/components/dropdown-menu"
import { softDeletePage } from "@shared/pages-access/delete"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { usePagesUIRouter } from "../router-context"
import { useOptimisticSoftDeletePage } from "../supabase/mutations/use-optimistic-soft-delete-page"

const NAV_SLUG = "nav"

export function NavItemActions({ pageId, href }: { pageId: string; href: string }) {
  const runSoftDelete = useOptimisticSoftDeletePage((args) => softDeletePage(args))
  const { pathname, push } = usePagesUIRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const onDeletedPage = pathname === href || pathname.startsWith(`${href}/`)
    await runSoftDelete({
      pageTypeSlug: NAV_SLUG,
      where: [{ key: "id", eq: pageId }],
    })
    if (onDeletedPage) push("/")
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const stopPointerPropagation = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded p-0.5 text-tertiary opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 [@media(hover:none)]:hidden"
          onClick={stopPropagation}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onPointerDown={stopPointerPropagation}>
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
