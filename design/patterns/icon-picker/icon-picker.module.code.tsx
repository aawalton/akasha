"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import { resolveIconName, searchIcons } from "@akasha/pages-core/icon"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { Icon } from "../lucide-icon/lucide-icon.module.code.tsx"

const ICONS_PER_PAGE = 36

interface IconPickerProps {
  value: string | null | undefined
  onChange: (name: IconName) => void
  className?: string
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  const currentIcon = resolveIconName(value)

  const filtered = useMemo(() => searchIcons(search), [search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ICONS_PER_PAGE))
  const safePage = Math.min(page, totalPages - 1)
  const pageIcons = filtered.slice(safePage * ICONS_PER_PAGE, (safePage + 1) * ICONS_PER_PAGE)

  const handleSelect = useCallback(
    (name: IconName) => {
      onChange(name)
      setOpen(false)
    },
    [onChange]
  )

  const handleSearchChange = useCallback((next: string) => {
    setSearch(next)
    setPage(0)
  }, [])

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setSearch("")
      setPage(0)
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 cursor-pointer items-center rounded p-0.5 text-current transition-colors hover:text-accent",
            className
          )}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          <Icon name={currentIcon} className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-64 space-y-2 p-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Search className="absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-tertiary" />
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-7 pl-7 text-xs"
          />
        </div>

        <div className="grid grid-cols-6 gap-1">
          {pageIcons.map((entry) => {
            const selected = entry.name === currentIcon
            return (
              <button
                key={entry.name}
                type="button"
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded p-1.5 transition-colors",
                  selected
                    ? cn("text-accent", surfaceClass(3))
                    : "text-secondary hover:bg-surface-2 hover:text-primary"
                )}
                title={entry.name}
                onClick={() => handleSelect(entry.name)}
              >
                <Icon name={entry.name} className="h-4 w-4" />
              </button>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={safePage === 0}
              className="rounded p-1 text-secondary transition-colors hover:text-primary disabled:opacity-30"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-tertiary text-xs">
              {safePage + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              className="rounded p-1 text-secondary transition-colors hover:text-primary disabled:opacity-30"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
