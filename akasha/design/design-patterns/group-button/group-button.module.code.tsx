"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { Heading } from "@akasha/design-primitives/heading"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Group, X } from "lucide-react"
import { useState } from "react"
import { AddSortButton } from "../add-sort-button/add-sort-button.module.code.tsx"
import { SortableSortList } from "../sort-group/sort-group.module.code.tsx"
import type { SortEntry, SortOption } from "../sort-types/sort-types.module.code.ts"

export interface GroupOption<T extends string = string> {
  value: T
  label: string
}

export interface GroupButtonProps<T extends string = string> {
  options: readonly GroupOption<T>[]
  groupBy: T | null
  onGroupByChange: (value: T | null) => void
  groupSorts: readonly SortEntry[]
  onGroupSortsChange: (sorts: readonly SortEntry[]) => void
  groupSortOptions: readonly SortOption[]
  defaultGroupSorts: readonly SortEntry[] | ((groupValue: T) => readonly SortEntry[])
  defaultGroupBy?: T | null
  align?: "start" | "center" | "end"
  popoverClassName?: string
  locked?: boolean
}

export function GroupButton<T extends string = string>({
  options,
  groupBy,
  onGroupByChange,
  groupSorts,
  onGroupSortsChange,
  groupSortOptions,
  defaultGroupSorts,
  defaultGroupBy = null,
  align = "end",
  popoverClassName,
  locked = false,
}: GroupButtonProps<T>) {
  const surface = useSurface()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const isDefault = !locked && groupBy === defaultGroupBy

  const triggerButton = (
    <Button
      variant={isDefault ? "tertiary" : "accent"}
      size="icon"
      className={surfaceClass(surface + 1)}
      aria-label="Group"
    >
      <Group />
    </Button>
  )

  if (isDefault) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onGroupByChange(option.value)
                const defaults =
                  typeof defaultGroupSorts === "function"
                    ? defaultGroupSorts(option.value)
                    : defaultGroupSorts
                onGroupSortsChange(defaults)
              }}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const activeOption = options.find((o) => o.value === groupBy)
  const label = activeOption?.label ?? String(groupBy)

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent align={align} className={cn("w-52", popoverClassName)}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <Heading variant="label" className="truncate">
              {label}
            </Heading>
            {!locked && (
              <button
                type="button"
                onClick={() => {
                  onGroupByChange(defaultGroupBy)
                  setPopoverOpen(false)
                }}
                aria-label={`Remove ${label} grouping`}
                className="cursor-pointer rounded p-1 text-tertiary transition-colors hover:text-primary"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <SortableSortList
            rows={groupSorts.map((sort, index) => {
              const option = groupSortOptions.find((o) => o.value === sort.field)
              return {
                id: String(sort.field),
                label: option?.label ?? sort.field,
                direction: sort.direction,
                onDirectionChange: (dir) => {
                  const updated = groupSorts.map((s, i) =>
                    i === index ? { ...s, direction: dir } : s
                  )
                  onGroupSortsChange(updated)
                },
                onRemove: () => {
                  const remaining = groupSorts.filter((_, i) => i !== index)
                  if (remaining.length > 0) {
                    onGroupSortsChange(remaining)
                  } else {
                    const defaults =
                      typeof defaultGroupSorts === "function" && groupBy != null
                        ? defaultGroupSorts(groupBy)
                        : typeof defaultGroupSorts === "function"
                          ? []
                          : defaultGroupSorts
                    onGroupSortsChange(defaults)
                  }
                },
              }
            })}
            onReorder={(nextFields) => {
              const next = nextFields.map((field) => {
                const existing = groupSorts.find((s) => String(s.field) === field)
                if (!existing) {
                  throw new Error(`GroupButton reorder produced unknown field id: ${field}`)
                }
                return existing
              })
              onGroupSortsChange(next)
            }}
          />
          <AddSortButton
            options={groupSortOptions
              .filter((o) => !groupSorts.some((s) => s.field === o.value))
              .map((o) => ({ id: o.value, label: o.label }))}
            onAdd={(id) => {
              const selected = groupSortOptions.find((o) => o.value === id)
              onGroupSortsChange([
                ...groupSorts,
                { field: id, direction: selected?.defaultDirection ?? "asc" },
              ])
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
