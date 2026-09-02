"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { Plus } from "lucide-react"
import { useMemo } from "react"

interface AddSortButtonProps<T extends string = string> {
  options: readonly { id: T; label: string }[]
  onAdd: (id: T) => void
}

export function AddSortButton<T extends string = string>({
  options,
  onAdd,
}: AddSortButtonProps<T>) {
  const sortedOptions = useMemo(
    () => [...options].sort((a, b) => a.label.localeCompare(b.label)),
    [options]
  )

  if (options.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonBadge variant="elevation-muted" className="shrink-0">
          <Plus className="size-3" />
          Add sort
        </ButtonBadge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortedOptions.map((option) => (
          <DropdownMenuItem key={option.id} onClick={() => onAdd(option.id)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
