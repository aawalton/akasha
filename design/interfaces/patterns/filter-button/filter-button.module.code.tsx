"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "akasha/design/interfaces/primitives/dropdown-menu/dropdown-menu.module.code.tsx"
import { Button } from "akasha/design/interfaces/primitives/modules/button/button.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interfaces/primitives/popover/popover.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { Filter } from "lucide-react"
import { useState } from "react"

interface FilterButtonProps {
  hasActiveFilters: boolean
  children: React.ReactNode
  align?: "start" | "center" | "end"
  popoverClassName?: string
  emptySelectOptions?: readonly { id: string; label: string }[]
  onEmptySelect?: (id: string) => void
}

export function FilterButton({
  hasActiveFilters,
  children,
  align = "end",
  popoverClassName,
  emptySelectOptions,
  onEmptySelect,
}: FilterButtonProps) {
  const surface = useSurface()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const triggerButton = (
    <Button
      variant={hasActiveFilters ? "accent" : "tertiary"}
      size="icon"
      className={surfaceClass(surface + 1)}
      aria-label="Filter"
    >
      <Filter />
    </Button>
  )

  if (emptySelectOptions && !hasActiveFilters) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {emptySelectOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => {
                onEmptySelect?.(option.id)
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
      <PopoverContent
        align={align}
        className={popoverClassName}
        onPointerDownOutside={(e) => {
          const target = e.target
          if (target instanceof Element && target.closest('[data-slot="select-content"]')) {
            e.preventDefault()
          }
        }}
        onFocusOutside={(e) => e.preventDefault()}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
