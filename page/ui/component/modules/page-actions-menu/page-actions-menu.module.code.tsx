"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { EllipsisVertical } from "lucide-react"

interface PageActionsMenuProps {
  href?: string
  viewPropertiesHref?: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
  onDelete?: () => void
  align?: "start" | "end"
  size?: "row" | "icon"
}

export function PageActionsMenu({
  href,
  viewPropertiesHref,
  isFavorite = false,
  onToggleFavorite,
  onDelete,
  align = "end",
  size = "row",
}: PageActionsMenuProps) {
  const showMenu =
    href != null || viewPropertiesHref != null || onToggleFavorite != null || onDelete != null
  if (!showMenu) return null

  const hasAboveDelete = href != null || viewPropertiesHref != null || onToggleFavorite != null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {size === "icon" ? (
          <Button type="button" variant="tertiary" size="icon" aria-label="Page actions">
            <EllipsisVertical />
          </Button>
        ) : (
          <button
            type="button"
            aria-label="Page actions"
            className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
          >
            <EllipsisVertical className="h-3.5 w-3.5" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {href != null && (
          <DropdownMenuItem asChild>
            <a href={href}>View Page</a>
          </DropdownMenuItem>
        )}
        {viewPropertiesHref != null && (
          <DropdownMenuItem asChild>
            <a href={viewPropertiesHref}>View properties</a>
          </DropdownMenuItem>
        )}
        {onToggleFavorite != null && (
          <DropdownMenuItem onSelect={() => onToggleFavorite()}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </DropdownMenuItem>
        )}
        {onDelete != null && (
          <>
            {hasAboveDelete && <DropdownMenuSeparator />}
            <DropdownMenuItem variant="destructive" onSelect={() => onDelete()}>
              Delete Page
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
