"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { AddSortButton } from "../add-sort-button/add-sort-button.module.code.tsx"
import { SortableSortList } from "../sort-group/sort-group.module.code.tsx"

import type { SortEntry, SortOption } from "../sort-types/sort-types.module.code.ts"

export interface SortButtonProps<T extends string = string> {
  options: readonly SortOption<T>[]
  sorts: readonly SortEntry<T>[]
  onSortsChange: (sorts: readonly SortEntry<T>[]) => void
  defaultSort?: SortEntry<T> | readonly SortEntry<T>[]
  align?: "start" | "center" | "end"
  popoverClassName?: string
}

export function SortButton<T extends string = string>(props: SortButtonProps<T>) {
  const { options, sorts, onSortsChange, defaultSort, align = "end", popoverClassName } = props
  const surface = useSurface()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const defaultSortEntries = defaultSort
    ? Array.isArray(defaultSort)
      ? defaultSort
      : [defaultSort]
    : undefined

  const isDefault = defaultSortEntries
    ? sorts.length === defaultSortEntries.length &&
      sorts.every((s, i) => {
        const entry = defaultSortEntries[i]
        return entry !== undefined && s.field === entry.field && s.direction === entry.direction
      })
    : sorts.length === 0

  const sortedFields = new Set(sorts.map((s) => s.field))
  const remainingOptions: { id: T; label: string }[] = options
    .filter((o) => !sortedFields.has(o.value))
    .map((o) => ({ id: o.value, label: o.label }))

  const triggerButton = (
    <Button
      variant={isDefault ? "tertiary" : "accent"}
      size="icon"
      className={surfaceClass(surface + 1)}
      aria-label="Sort"
    >
      <ArrowUpDown />
    </Button>
  )

  if (sorts.length === 0 && remainingOptions.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {remainingOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => {
                const selected = options.find((o) => o.value === option.id)
                onSortsChange([
                  { field: option.id, direction: selected?.defaultDirection ?? "asc" },
                ])
                setPopoverOpen(true)
              }}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent align={align} className={cn("w-52", popoverClassName)}>
        <div className="flex flex-col gap-3">
          <SortableSortList
            rows={sorts.map((sort, index) => {
              const option = options.find((o) => o.value === sort.field)
              return {
                id: String(sort.field),
                label: option?.label ?? String(sort.field),
                direction: sort.direction,
                canRemove: true,
                onDirectionChange: (dir) => {
                  const updated = sorts.map((s, i) => (i === index ? { ...s, direction: dir } : s))
                  onSortsChange(updated)
                },
                onRemove: () => {
                  onSortsChange(sorts.filter((_, i) => i !== index))
                },
              }
            })}
            onReorder={(nextFields) => {
              const next = nextFields.map((field) => {
                const existing = sorts.find((s) => String(s.field) === field)
                if (!existing) {
                  throw new Error(`SortButton reorder produced unknown field id: ${field}`)
                }
                return existing
              })
              onSortsChange(next)
            }}
          />
          <AddSortButton
            options={remainingOptions}
            onAdd={(id) => {
              const selected = options.find((o) => o.value === id)
              onSortsChange([
                ...sorts,
                { field: id, direction: selected?.defaultDirection ?? "asc" },
              ])
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
