"use client"

import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type { SortDirection, SortOption } from "@akasha/design-patterns/sort-types"
import type {
  CompletionFilter,
  CompletionSortMode,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { createContext, useContext } from "react"

export interface CompletionToolbarContextValue {
  completionFilter: CompletionFilter
  sortMode: CompletionSortMode
  sortDirection: SortDirection
  sortOptions: readonly SortOption<CompletionSortMode>[]
  search: string
  selectedStatus: readonly BadgeToggleGroupItem[]
  statusItems: readonly BadgeToggleGroupItem[]
  hasActiveFilters: boolean
  onReset: () => void
  onStatusSelect: (items: readonly BadgeToggleGroupItem[]) => void
  onSortChange: (field: CompletionSortMode, direction: SortDirection) => void
  onSearchChange: (value: string) => void
}

const CompletionToolbarContext = createContext<CompletionToolbarContextValue | null>(null)

export const CompletionToolbarProvider = CompletionToolbarContext.Provider

export function useCompletionToolbar(): CompletionToolbarContextValue {
  const ctx = useContext(CompletionToolbarContext)
  if (!ctx) {
    throw new Error("useCompletionToolbar must be used within a CompletionToolbarProvider")
  }
  return ctx
}
