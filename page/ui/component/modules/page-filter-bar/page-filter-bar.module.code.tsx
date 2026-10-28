"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { AddFilterButton } from "akasha/design/interface/pattern/modules/add-filter-button/add-filter-button.module.code.tsx"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { FilterGroup } from "akasha/design/interface/pattern/modules/filter-group/filter-group.module.code.tsx"
import { segmentsOf } from "akasha/page/core/filter/modules/property-path/property-path.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { PageFilterDimension } from "akasha/page/core/view/modules/generate-filter-dimensions/generate-filter-dimensions.module.code.ts"
import { OperatorFilterControl } from "akasha/page/ui/component/modules/operator-filter-control/operator-filter-control.module.code.tsx"
import { useState } from "react"

type ShownFilterGroup = {
  readonly id: string
  readonly label: string
  readonly dimension: PageFilterDimension | undefined
  readonly filter: ViewFilter | undefined
}

function labelOf(id: string, dimensions: readonly PageFilterDimension[]): string {
  const named = dimensions.find((one) => one.id === id)
  if (named !== undefined) return named.label
  const [head = id, ...rest] = segmentsOf(id)
  const headLabel = dimensions.find((one) => one.id === head)?.label ?? titledAs(head)
  return [headLabel, ...rest.map((one) => titledAs(one))].join(" › ")
}

function controls(dimension: PageFilterDimension, filter: ViewFilter | undefined): boolean {
  return filter === undefined || dimension.operators.some((one) => one.value === filter.operator)
}

export function shownFilterGroups(
  opened: readonly string[],
  filters: readonly ViewFilter[],
  dimensions: readonly PageFilterDimension[]
): readonly ShownFilterGroup[] {
  const ids = [...opened]
  for (const one of filters) if (!ids.includes(one.propertyId)) ids.push(one.propertyId)
  const shown: ShownFilterGroup[] = []
  for (const id of ids) {
    const filter = filters.find((one) => one.propertyId === id)
    const dimension = dimensions.find((one) => one.id === id)
    if (dimension === undefined && filter === undefined) continue
    shown.push({
      id,
      label: labelOf(id, dimensions),
      dimension: dimension !== undefined && controls(dimension, filter) ? dimension : undefined,
      filter,
    })
  }
  return shown
}

function valueStated(value: ReadonlyJSONValue | undefined): string {
  if (value === undefined || value === null) return ""
  if (Array.isArray(value)) return value.map((one) => valueStated(one)).join(", ")
  if (!isRecord(value)) return String(value)
  const { sentinel } = value
  if (typeof sentinel === "string") return sentinel.replaceAll("_", " ")
  return JSON.stringify(value)
}

export function filterStated(
  filter: ViewFilter,
  dimensions: readonly PageFilterDimension[]
): string {
  const label =
    dimensions.flatMap((one) => one.operators).find((one) => one.value === filter.operator)
      ?.label ?? filter.operator.replaceAll("_", " ")
  const value = valueStated(filter.value)
  return value === "" ? label : `${label} ${value}`
}

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
  const [openDimensions, setOpenDimensions] = useState<readonly string[]>([])
  const groups = shownFilterGroups(openDimensions, filters, filterDimensions)

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
    .filter((dim) => !groups.some((group) => group.id === dim.id))
    .map((dim) => ({ id: dim.id, label: dim.label }))

  return (
    <FilterButton
      hasActiveFilters={hasActiveFilters}
      popoverClassName="max-w-panel"
      emptySelectOptions={groups.length === 0 ? availableOptions : undefined}
      onEmptySelect={addDimension}
    >
      <div className="flex flex-col gap-4">
        {groups.map(({ id: dimId, label, dimension, filter: activeFilter }) => {
          if (dimension === undefined) {
            return (
              <FilterGroup key={dimId} label={label} onRemove={() => removeDimension(dimId)}>
                <span className="text-secondary text-xs">
                  {activeFilter === undefined ? "" : filterStated(activeFilter, filterDimensions)}
                </span>
              </FilterGroup>
            )
          }

          return (
            <FilterGroup key={dimId} label={label} onRemove={() => removeDimension(dimId)}>
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
