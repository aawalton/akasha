"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"

export interface SearchMultiSelectItem {
  value: string
  label: string
  view?: React.ReactNode
}

export interface SearchMultiSelectProps {
  items: readonly SearchMultiSelectItem[]

  onSelect: (value: readonly SearchMultiSelectItem[]) => void

  value: readonly SearchMultiSelectItem[]

  caption?: string

  searchValue: string

  onSearchValueChange: (s: string) => void

  collapseOnSelect?: boolean

  size?: "badge" | "sm" | "default"

  disabled?: boolean

  className?: string

  onOpenChange?: (open: boolean) => void

  footer?: React.ReactNode
}

function SearchMultiSelect({
  collapseOnSelect = false,
  size = "default",
  disabled = false,
  className,
  onOpenChange,
  footer,
  ...props
}: SearchMultiSelectProps) {
  const surface = useSurface()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpenState] = useState(false)

  const setOpen = (next: boolean) => {
    setOpenState(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      props.onSearchValueChange("")
    }
  }, [open, props.onSearchValueChange])

  const toggleSelect = (value: SearchMultiSelectItem) => {
    if (props.value.some((x) => x.value === value.value)) {
      props.onSelect(props.value.filter((x) => x.value !== value.value))
    } else {
      props.onSelect([...props.value, value])
    }
    if (collapseOnSelect) {
      setOpen(false)
    }
  }

  const clearSearch = () => {
    props.onSearchValueChange("")
    inputRef.current?.focus()
  }

  return (
    <div data-slot="search-multi-select">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              `flex items-center rounded-md ${surfaceClass(surface + 1)} transition-colors hover:bg-primary/[0.08] disabled:pointer-events-none disabled:opacity-[0.38]`,
              size === "badge"
                ? "w-fit gap-1 px-2 py-0.5 font-medium text-xs"
                : "w-full gap-2 px-3 text-sm",
              size === "default" && "h-9",
              size === "sm" && "h-8",
              className
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
            {!disabled && (
              <ChevronDownIcon
                className={cn("shrink-0 text-tertiary", size === "badge" ? "size-3" : "size-4")}
              />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0",
            size === "badge" ? "min-w-[200px]" : "w-[var(--radix-popover-trigger-width)]"
          )}
          align="start"
        >
          {}
          <div className="flex items-center gap-2 px-2 py-2">
            <input
              ref={inputRef}
              className={cn(
                "flex-1 rounded px-2 py-1 text-sm outline-none placeholder:text-tertiary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
                surfaceClass(4)
              )}
              placeholder="Search..."
              value={props.searchValue}
              onChange={(e) => props.onSearchValueChange(e.target.value)}
            />
            {props.searchValue !== "" && (
              <button
                type="button"
                onClick={clearSearch}
                className="flex items-center justify-center rounded p-0.5 transition-colors hover:bg-primary/[0.08] active:bg-primary/[0.12]"
                aria-label="Clear search"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>

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
          {footer}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { SearchMultiSelect }
