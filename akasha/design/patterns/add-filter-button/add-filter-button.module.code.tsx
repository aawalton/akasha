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

interface AddFilterButtonProps {
  options: readonly { id: string; label: string }[]
  onAdd: (id: string) => void
}

export function AddFilterButton({ options, onAdd }: AddFilterButtonProps) {
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
          Add filter
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
