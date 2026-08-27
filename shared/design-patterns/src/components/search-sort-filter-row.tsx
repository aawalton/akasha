"use client"

import { Button } from "@shared/design-primitives/components/button"
import { cn } from "@shared/design-primitives/utils/cn"
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
