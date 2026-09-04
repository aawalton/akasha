"use client"

import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import type { ViewFilter } from "@akasha/pages-core/schema/view-data"
import type { PageFilterDimension } from "@akasha/pages-core/view/generate-filter-dimensions"
import { OperatorFilterControl } from "@akasha/pages-ui-components/operator-filter-control"
import { useState } from "react"

interface PagesFilterBarProps {
  filters: readonly ViewFilter[]
  onFiltersChange: (filters: readonly ViewFilter[]) => void
  filterDimensions: readonly PageFilterDimension[]
  hasActiveFilters: boolean
}

export function PagesFilterBar({
  filters,
  onFiltersChange,
  filterDimensions,
  hasActiveFilters,
}: PagesFilterBarProps) {
  const [openDimensions, setOpenDimensions] = useState<string[]>(() => {
    const initial: string[] = []
    for (const f of filters) {
      if (!initial.includes(f.propertyId)) {
        initial.push(f.propertyId)
      }
    }
    return initial
  })

  const addDimension = (id: string) => {
    setOpenDimensions((prev) => (prev.includes(id) ? prev : [...prev, id]))
    if (!filters.some((f) => f.propertyId === id)) {
      const dimension = filterDimensions.find((d) => d.id === id)
      const defaultOperator = dimension?.operators[0]?.value
      if (defaultOperator != null) {
        onFiltersChange([...filters, { propertyId: id, operator: defaultOperator }])
      }
    }
  }

  const removeDimension = (id: string) => {
    setOpenDimensions((prev) => prev.filter((d) => d !== id))
    onFiltersChange([...filters].filter((f) => f.propertyId !== id))
  }

  const availableOptions = filterDimensions
    .filter((dim) => !openDimensions.includes(dim.id))
    .map((dim) => ({ id: dim.id, label: dim.label }))

  return (
    <FilterButton
      hasActiveFilters={hasActiveFilters}
      popoverClassName="max-w-panel"
      emptySelectOptions={openDimensions.length === 0 ? availableOptions : undefined}
      onEmptySelect={addDimension}
    >
      <div className="flex flex-col gap-4">
        {openDimensions.map((dimId) => {
          const dimension = filterDimensions.find((d) => d.id === dimId)
          if (!dimension) return null

          const activeFilter = filters.find((f) => f.propertyId === dimId)

          return (
            <FilterGroup
              key={dimId}
              label={dimension.label}
              onRemove={() => removeDimension(dimId)}
            >
              <OperatorFilterControl
                dimension={dimension}
                filter={activeFilter}
                onFilterChange={(newFilter) => {
                  const otherFilters = [...filters].filter((f) => f.propertyId !== dimId)
                  if (newFilter) {
                    onFiltersChange([...otherFilters, newFilter])
                  } else {
                    onFiltersChange(otherFilters)
                  }
                }}
              />
            </FilterGroup>
          )
        })}
        <AddFilterButton options={availableOptions} onAdd={addDimension} />
      </div>
    </FilterButton>
  )
}
