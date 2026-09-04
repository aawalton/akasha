"use client"

import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { useDebouncedValue } from "@akasha/design-primitives/use-debounced-value"
import type { PageResolverValue } from "@akasha/pages-ui/contexts/page-resolver-context"
import { useRelationPicker } from "@akasha/pages-ui/contexts/relation-picker-context"
import { Plus, X } from "lucide-react"
import { useMemo, useState } from "react"

const SEARCH_DEBOUNCE_MS = 200

interface RelationPopoverProps {
  currentIds: readonly string[]
  targetPageTypeId: string | undefined
  resolver: PageResolverValue
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onPageNavigate?: (pageId: string) => void
  align?: "start" | "end"
  children: React.ReactNode
}

const ROW_CLS =
  "flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-primary text-sm hover:bg-surface-4"

export function RelationPopover({
  currentIds,
  targetPageTypeId,
  resolver,
  onAdd,
  onRemove,
  onPageNavigate,
  align = "start",
  children,
}: RelationPopoverProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS)

  const picker = useRelationPicker(targetPageTypeId, {
    searchTerm: debouncedSearch,
    enabled: open,
  })

  const candidates = useMemo(
    () => picker.pages.filter((page) => !currentIds.includes(page.id)),
    [picker.pages, currentIds]
  )

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) setSearchQuery("")
      }}
    >
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-64 p-2" onPointerDown={(e) => e.stopPropagation()}>
        {currentIds.length > 0 && (
          <div data-slot="current-relations">
            {currentIds.map((id) => {
              const title = resolver.resolve(id)?.title ?? id
              return (
                <button
                  key={id}
                  type="button"
                  className={ROW_CLS}
                  onClick={(e) => {
                    e.stopPropagation()
                    onPageNavigate?.(id)
                  }}
                >
                  <span className="flex-1 truncate">{title}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    className="shrink-0 rounded p-0.5 text-tertiary hover:bg-surface-5 hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(id)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation()
                        onRemove(id)
                      }
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                </button>
              )
            })}
          </div>
        )}
        <div className={currentIds.length > 0 ? "border-surface-3 border-t pt-2" : ""}>
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div
          data-slot="candidates"
          className="-mr-2 max-h-48 overflow-y-auto pt-2 [scrollbar-gutter:stable]"
        >
          {picker.isLoading ? (
            <div className="px-2 py-1.5 text-sm text-tertiary">Loading…</div>
          ) : candidates.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-tertiary">No pages found</div>
          ) : (
            <>
              {candidates.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  className={ROW_CLS}
                  onClick={(e) => {
                    e.stopPropagation()
                    onAdd(page.id)
                  }}
                >
                  <span className="flex-1 truncate">{page.title}</span>
                  <Plus className="h-3.5 w-3.5 shrink-0 text-tertiary" />
                </button>
              ))}
              {picker.canLoadMore && (
                <button
                  type="button"
                  className="w-full rounded px-2 py-1.5 text-left text-accent text-xs hover:bg-surface-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    picker.loadMore()
                  }}
                >
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
