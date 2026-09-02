"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"
import type * as React from "react"
import { useState } from "react"

export interface MultiSelectItem {
  value: string
  label: string
  view?: React.ReactNode
}

export interface MultiSelectProps {
  items: readonly MultiSelectItem[]

  onSelect: (value: readonly MultiSelectItem[]) => void

  value: readonly MultiSelectItem[]

  caption?: string

  collapseOnSelect?: boolean

  size?: "sm" | "default"

  disabled?: boolean

  className?: string
}

function MultiSelect({
  collapseOnSelect = false,
  size = "default",
  disabled = false,
  className,
  ...props
}: MultiSelectProps) {
  const surface = useSurface()
  const [open, setOpen] = useState(false)

  const toggleSelect = (value: MultiSelectItem) => {
    if (props.value.some((x) => x.value === value.value)) {
      props.onSelect(props.value.filter((x) => x.value !== value.value))
    } else {
      props.onSelect([...props.value, value])
    }
    if (collapseOnSelect) {
      setOpen(false)
    }
  }

  return (
    <div data-slot="multi-select" className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              `flex w-full items-center gap-2 rounded-md ${surfaceClass(surface + 1)} px-3 text-sm transition-colors hover:bg-primary/[0.08] disabled:pointer-events-none disabled:opacity-[0.38]`,
              size === "default" && "h-9",
              size === "sm" && "h-8"
            )}
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-left",
                props.value.length === 0 && "text-tertiary"
              )}
            >
              {props.value.length > 0
                ? props.value.map((x) => x.label).join(" + ")
                : (props.caption ?? "Select items")}
            </span>
            {!disabled && <ChevronDownIcon className="size-4 shrink-0 text-tertiary" />}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 shadow-2xl"
          align="start"
        >
          {}
          <div className="max-h-[360px] overflow-y-auto p-1">
            {props.items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-2 py-6 text-center">
                <SearchIcon className="size-5 text-tertiary" />
                <span className="text-sm text-tertiary">No items found</span>
              </div>
            ) : (
              <div className="space-y-0.5">
                {props.items.map((x) => {
                  const isSelected = props.value.some((y) => x.value === y.value)
                  return (
                    <button
                      type="button"
                      key={`item-${x.value}`}
                      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-hidden transition-colors hover:bg-primary/[0.08] active:bg-primary/[0.12] disabled:pointer-events-none disabled:opacity-[0.38] data-[selected=true]:bg-primary/[0.12]"
                      onClick={() => toggleSelect(x)}
                      data-selected={isSelected}
                    >
                      <div className="flex-1">{x.view ?? x.label}</div>
                      {isSelected && <CheckIcon className="size-4 text-accent" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { MultiSelect }
