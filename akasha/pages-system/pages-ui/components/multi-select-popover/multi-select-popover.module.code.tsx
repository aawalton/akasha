"use client"

import { Badge } from "@akasha/design-badges/badge"
import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import type { SelectOption } from "@akasha/pages-core/schema/select-option-create"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface MultiSelectPopoverProps {
  currentIds: readonly string[]
  options: readonly SelectOption[]
  onAdd: (id: string, eventTimeStamp?: number) => void
  onRemove: (id: string, eventTimeStamp?: number) => void
  onCreate?: (label: string, eventTimeStamp?: number) => void
  align?: "start" | "end"
  getVariant?: (optionId: string) => BadgeVariant | undefined
  children: React.ReactNode
}

const ROW_CLS =
  "flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-primary text-sm hover:bg-surface-4"

export function MultiSelectPopover({
  currentIds,
  options,
  onAdd,
  onRemove,
  onCreate,
  align = "start",
  getVariant,
  children,
}: MultiSelectPopoverProps) {
  const variantFor = (id: string): BadgeVariant => getVariant?.(id) ?? "elevation-muted"
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedOptions = currentIds
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is SelectOption => o != null)

  const candidates = options.filter(
    (opt) =>
      !currentIds.includes(opt.id) && opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const trimmedQuery = searchQuery.trim()
  const showCreate =
    onCreate != null &&
    trimmedQuery.length > 0 &&
    !options.some((o) => o.label.toLowerCase() === trimmedQuery.toLowerCase())

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
          className="inline-flex cursor-pointer items-center gap-1.5 outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-64 p-2" onPointerDown={(e) => e.stopPropagation()}>
        {selectedOptions.length > 0 && (
          <div data-slot="current-selections">
            {selectedOptions.map((opt) => (
              <div key={opt.id} className={ROW_CLS}>
                <Badge variant={variantFor(opt.id)} className="text-xs">
                  {opt.label}
                </Badge>
                <span className="flex-1" />
                <span
                  role="button"
                  tabIndex={0}
                  className="shrink-0 cursor-pointer rounded p-0.5 text-tertiary hover:bg-surface-5 hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(opt.id, e.timeStamp)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation()
                      onRemove(opt.id, e.timeStamp)
                    }
                  }}
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              </div>
            ))}
          </div>
        )}
        <div className={selectedOptions.length > 0 ? "border-surface-3 border-t pt-2" : ""}>
          <Input
            placeholder="Search options..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && showCreate && onCreate !== undefined) {
                e.stopPropagation()
                onCreate(trimmedQuery, e.timeStamp)
                setSearchQuery("")
              }
            }}
            className="text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div
          data-slot="candidates"
          className="-mr-2 max-h-48 overflow-y-auto pt-2 [scrollbar-gutter:stable]"
        >
          {showCreate && onCreate !== undefined && (
            <button
              type="button"
              className={ROW_CLS}
              onClick={(e) => {
                e.stopPropagation()
                onCreate(trimmedQuery, e.timeStamp)
                setSearchQuery("")
              }}
            >
              <Plus className="h-3.5 w-3.5 shrink-0 font-bold text-accent" />
              <span className="flex-1 truncate">
                Create <span className="font-semibold">{trimmedQuery}</span>
              </span>
            </button>
          )}
          {candidates.length === 0 && !showCreate ? (
            <div className="px-2 py-1.5 text-sm text-tertiary">No options found</div>
          ) : (
            candidates.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={ROW_CLS}
                onClick={(e) => {
                  e.stopPropagation()
                  onAdd(opt.id, e.timeStamp)
                }}
              >
                <Badge variant={variantFor(opt.id)} className="text-xs">
                  {opt.label}
                </Badge>
                <span className="flex-1" />
                <Plus className="h-3.5 w-3.5 shrink-0 text-tertiary" />
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
