"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { X } from "lucide-react"

interface SearchSortFilterRowProps {
  children: React.ReactNode
  hasActiveFilters: boolean
  onReset: () => void
  className?: string
}

export function SearchSortFilterRow({
  children,
  hasActiveFilters,
  onReset,
  className,
}: SearchSortFilterRowProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2", className)}>
      {hasActiveFilters && (
        <Button variant="tertiary" size="icon" onClick={onReset} aria-label="Reset filters">
          <X className="size-4" />
        </Button>
      )}
      {children}
    </div>
  )
}
