"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/primitives/dropdown-menu/dropdown-menu.module.code.tsx"
import { deletePage } from "akasha/pages/access/deleting/deleting.module.code.ts"
import { usePagesUIRouter } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/pages/ui/supabase/mutations/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { MoreHorizontal, Trash2 } from "lucide-react"

const NAV_SLUG = "nav"

export function NavItemActions({ pageId, href }: { pageId: string; href: string }) {
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
  const { pathname, push } = usePagesUIRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const onDeletedPage = pathname === href || pathname.startsWith(`${href}/`)
    await runDelete({
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
