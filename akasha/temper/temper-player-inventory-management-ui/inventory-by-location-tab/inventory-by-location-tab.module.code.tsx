"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { scrollToCard } from "@akasha/design-layout/scroll-to-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { Button } from "@akasha/design-primitives/button"
import { computeCurrencyGoldTotal } from "@akasha/temper-items-core/inventory-currencies"
import {
  filterInventoryGroups,
  groupInventoryByLocation,
  type InventoryLocationGroup,
} from "@akasha/temper-items-core/inventory-grouping"
import type { ExcludedLocation } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import type {
  InventoryCurrencies,
  InventoryDatabase,
} from "@akasha/temper-items-core/inventory-types"
import { type LocationTypeId, locationTypes } from "@akasha/temper-items-core/location-type-data"
import { Search } from "lucide-react"
import { useMemo } from "react"
import { InventoryLocationSummaryPanelCard } from "../inventory-location-summary-panel-card/inventory-location-summary-panel-card.module.code.tsx"
import {
  InventoryLocationTypePanelCard,
  type LocationTypeCardData,
} from "../inventory-location-type-panel-card/inventory-location-type-panel-card.module.code.tsx"
import type { InventorySortMode } from "../inventory-panel-card/inventory-panel-card.module.code.tsx"
import { InventoryScopeNote } from "../inventory-scope-note/inventory-scope-note.module.code.tsx"

interface InventoryByLocationTabProps {
  inventory: InventoryDatabase
  excluded?: readonly ExcludedLocation[]
  currencies?: InventoryCurrencies
  conversionRates?: Record<string, number>
  search?: string
  qualities?: readonly number[]
  traits?: readonly string[]
  sortBy?: InventorySortMode
  sortDirection?: SortDirection
  onClearFilters?: () => void
}

export function InventoryByLocationTab({
  inventory,
  excluded = [],
  currencies,
  conversionRates,
  search = "",
  qualities = [],
  traits = [],
  sortBy,
  sortDirection,
  onClearFilters,
}: InventoryByLocationTabProps) {
  const summary = useMemo(() => groupInventoryByLocation(inventory), [inventory])

  const filteredSummary = useMemo(() => {
    if (search === "" && qualities.length === 0 && traits.length === 0) return summary
    const filteredGroups = filterInventoryGroups(summary.groups, search, qualities, traits)
    let totalItems = 0
    let totalOccupiedSlots = 0
    let totalValue: number | undefined
    let hasAnyValue = false
    for (const group of filteredGroups) {
      totalItems += group.totalItems
      totalOccupiedSlots += group.occupiedSlots
      if (group.totalValue !== undefined) {
        hasAnyValue = true
        totalValue = (totalValue ?? 0) + group.totalValue
      }
    }
    return {
      totalItems,
      occupiedSlots: totalOccupiedSlots,
      totalValue: hasAnyValue ? totalValue : undefined,
      groups: filteredGroups,
    }
  }, [summary, search, qualities, traits])

  const cards = useMemo(() => {
    const typeMap = new Map<LocationTypeId, InventoryLocationGroup[]>()
    for (const group of filteredSummary.groups) {
      let list = typeMap.get(group.locationType)
      if (!list) {
        list = []
        typeMap.set(group.locationType, list)
      }
      list.push(group)
    }

    const result: LocationTypeCardData[] = []
    for (const [locationType, groups] of typeMap) {
      const title = locationTypes.data[locationType]?.name ?? locationType
      result.push({ locationType, title, groups })
    }
    result.sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [filteredSummary.groups])

  function handleSummaryClick(key: string) {
    const card =
      cards.find((c) => c.locationType === key) ??
      cards.find((c) => c.groups.some((g) => g.locationKey === key))
    if (card) {
      scrollToCard(`inventory-location-${card.locationType}`, false)
    }
  }

  const currencySummaryResult = useMemo(
    () => computeCurrencyGoldTotal(currencies, conversionRates),
    [currencies, conversionRates]
  )

  const hasActiveFilters = search.length > 0 || qualities.length > 0 || traits.length > 0

  if (hasActiveFilters && filteredSummary.groups.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No matching items</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or filters to find what you're looking for.
          </EmptyDescription>
        </EmptyHeader>
        {onClearFilters && (
          <EmptyContent>
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              Clear filters
            </Button>
          </EmptyContent>
        )}
      </Empty>
    )
  }

  return (
    <ResponsiveColumns hasSummaryPanel sortChildren={false}>
      <InventoryLocationSummaryPanelCard
        summary={filteredSummary}
        currencyCount={!hasActiveFilters ? currencySummaryResult?.count : undefined}
        currencyGoldTotal={!hasActiveFilters ? currencySummaryResult?.goldTotal : undefined}
        onItemClick={handleSummaryClick}
        scopeNote={
          <InventoryScopeNote
            excluded={excluded}
            includesCurrencies={!hasActiveFilters && currencySummaryResult?.goldTotal !== undefined}
            filtered={hasActiveFilters}
          />
        }
      />
      {cards.map((card) => (
        <InventoryLocationTypePanelCard
          key={card.locationType}
          card={card}
          currencies={!hasActiveFilters ? currencies : undefined}
          conversionRates={conversionRates}
          sortMode={sortBy}
          sortDirection={sortDirection}
        />
      ))}
    </ResponsiveColumns>
  )
}
