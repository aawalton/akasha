"use client"

import { useState } from "react"
import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { AddFilterButton } from "@shared/design-patterns/components/add-filter-button"
import { AddSortButton } from "@shared/design-patterns/components/add-sort-button"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { SortButton } from "@shared/design-patterns/components/sort-button"
import { SortGroup } from "@shared/design-patterns/components/sort-group"
import { type SortDirection, type SortEntry, type SortOption } from "@shared/design-patterns/utils/sort-types"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

const SORT_OPTIONS: SortOption[] = [
  { value: "name", label: "Name", defaultDirection: "asc" },
  { value: "date", label: "Date Modified", defaultDirection: "desc" },
  { value: "size", label: "Size", defaultDirection: "desc" },
  { value: "type", label: "Type", defaultDirection: "asc" },
]

const FILTER_OPTIONS = [
  { id: "type", label: "Type" },
  { id: "status", label: "Status" },
  { id: "author", label: "Author" },
]

export function ComponentsSortFilterPanels() {
  const [sorts, setSorts] = useState<readonly SortEntry[]>([{ field: "name", direction: "asc" }])
  const [activeFilters, setActiveFilters] = useState<
    { id: string; label: string; values: string[] }[]
  >([])

  const hasActiveFilters = activeFilters.length > 0
  const isDefaultSort =
    sorts.length === 1 && sorts[0]?.field === "name" && sorts[0]?.direction === "asc"

  function handleReset() {
    setSorts([{ field: "name", direction: "asc" }])
    setActiveFilters([])
  }

  function handleAddFilter(id: string) {
    const option = FILTER_OPTIONS.find((o) => o.id === id)
    if (option && !activeFilters.some((f) => f.id === id)) {
      setActiveFilters([...activeFilters, { id, label: option.label, values: ["Example"] }])
    }
  }

  function handleRemoveFilter(id: string) {
    setActiveFilters(activeFilters.filter((f) => f.id !== id))
  }

  const remainingFilterOptions = FILTER_OPTIONS.filter(
    (o) => !activeFilters.some((f) => f.id === o.id)
  )

  const [multiSorts, setMultiSorts] = useState<readonly SortEntry[]>([
    { field: "date", direction: "desc" },
    { field: "name", direction: "asc" },
  ])

  const [groupDirection, setGroupDirection] = useState<SortDirection>("asc")

  const [filterActive, setFilterActive] = useState(true)

  const [addedSorts, setAddedSorts] = useState<string[]>([])
  const addSortOptions = [
    { id: "priority", label: "Priority" },
    { id: "created", label: "Created Date" },
    { id: "updated", label: "Updated Date" },
  ].filter((o) => !addedSorts.includes(o.id))

  const [addedFilters, setAddedFilters] = useState<string[]>([])
  const addFilterOptions = [
    { id: "category", label: "Category" },
    { id: "tag", label: "Tag" },
    { id: "owner", label: "Owner" },
  ].filter((o) => !addedFilters.includes(o.id))

  return (
    <>
      {}
      <PanelCard id="ds-sort-filter-composed" collapsible title="SearchSortFilterRow (Composed)">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Full system: SearchSortFilterRow wrapping SortButton and FilterButton. The reset button
            appears when sorts or filters deviate from defaults.
          </p>
          <SearchSortFilterRow
            hasActiveFilters={hasActiveFilters || !isDefaultSort}
            onReset={handleReset}
          >
            <SortButton
              options={SORT_OPTIONS}
              sorts={sorts}
              onSortsChange={setSorts}
              defaultSort={{ field: "name", direction: "asc" }}
            />
            <FilterButton
              hasActiveFilters={hasActiveFilters}
              emptySelectOptions={FILTER_OPTIONS}
              onEmptySelect={handleAddFilter}
            >
              <div className="flex flex-col gap-3">
                {activeFilters.map((filter) => (
                  <FilterGroup
                    key={filter.id}
                    label={filter.label}
                    onRemove={() => handleRemoveFilter(filter.id)}
                  >
                    <div className="flex flex-wrap gap-1">
                      {filter.values.map((v) => (
                        <Badge key={v} variant="elevation">
                          {v}
                        </Badge>
                      ))}
                    </div>
                  </FilterGroup>
                ))}
                <AddFilterButton options={remainingFilterOptions} onAdd={handleAddFilter} />
              </div>
            </FilterButton>
          </SearchSortFilterRow>
          <p className="text-tertiary text-xs">
            Current: sorting by {sorts.map((s) => `${s.field} (${s.direction})`).join(", ")}
            {hasActiveFilters && ` | filtering by ${activeFilters.map((f) => f.label).join(", ")}`}
          </p>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-sort-button-multi" collapsible title="SortButton (Multi Sort)">
        <div className="space-y-3">
          <p className="text-secondary text-sm">
            Multi-sort API with <code>sorts</code> / <code>onSortsChange</code>. Supports priority
            numbers and adding additional sort criteria.
          </p>
          <div className="flex items-center gap-3">
            <SortButton
              options={SORT_OPTIONS}
              sorts={multiSorts}
              onSortsChange={setMultiSorts}
              defaultSort={{ field: "name", direction: "asc" }}
            />
            <span className="text-tertiary text-xs">
              {multiSorts.map((s) => `${s.field} (${s.direction})`).join(", ")}
            </span>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-sort-group" collapsible title="SortGroup">
        <div className="space-y-3">
          <p className="text-secondary text-sm">
            Displays a single sort criterion with direction toggle and remove button. Used inside
            SortButton&apos;s popover.
          </p>
          <div className={cn("max-w-xs rounded-lg p-3", surfaceClass(2))}>
            <div className="flex flex-col gap-3">
              <SortGroup
                label="Name"
                direction={groupDirection}
                onDirectionChange={setGroupDirection}
                onRemove={() => setGroupDirection("asc")}
              />
              <SortGroup
                label="Date Modified"
                direction="desc"
                onDirectionChange={() => {}}
                onRemove={() => {}}
              />
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-filter-button" collapsible title="FilterButton">
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Shows a filter icon button. When <code>hasActiveFilters</code> is false and
            <code> emptySelectOptions</code> is provided, clicking opens a dropdown to pick the
            first filter. When active, opens a popover with filter content.
          </p>
          <div className="space-y-3">
            <div className="space-y-1">
              <Heading>Active (popover with content)</Heading>
              <div className="flex items-center gap-3">
                <FilterButton hasActiveFilters={filterActive}>
                  <div className="flex flex-col gap-3">
                    <FilterGroup label="Status" onRemove={() => setFilterActive(false)}>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="elevation">Active</Badge>
                        <Badge variant="elevation">Pending</Badge>
                      </div>
                    </FilterGroup>
                  </div>
                </FilterButton>
                <span className="text-tertiary text-xs">Click to see popover</span>
              </div>
            </div>
            <div className="space-y-1">
              <Heading>Inactive (dropdown selector)</Heading>
              <div className="flex items-center gap-3">
                <FilterButton
                  hasActiveFilters={false}
                  emptySelectOptions={[
                    { id: "type", label: "Type" },
                    { id: "status", label: "Status" },
                  ]}
                  onEmptySelect={() => {}}
                >
                  <div />
                </FilterButton>
                <span className="text-tertiary text-xs">Click to see dropdown</span>
              </div>
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-add-sort-button" collapsible title="AddSortButton">
        <div className="space-y-3">
          <p className="text-secondary text-sm">
            A small badge-style button that opens a dropdown to add a new sort criterion. Returns
            null when no options remain.
          </p>
          <div className="flex items-center gap-3">
            <AddSortButton
              options={addSortOptions}
              onAdd={(id) => setAddedSorts([...addedSorts, id])}
            />
            {addedSorts.length > 0 && (
              <span className="text-tertiary text-xs">Added: {addedSorts.join(", ")}</span>
            )}
            {addSortOptions.length === 0 && (
              <span className="text-tertiary text-xs">
                All options added.{" "}
                <button
                  type="button"
                  className="cursor-pointer underline"
                  onClick={() => setAddedSorts([])}
                >
                  Reset
                </button>
              </span>
            )}
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-add-filter-button" collapsible title="AddFilterButton">
        <div className="space-y-3">
          <p className="text-secondary text-sm">
            A small badge-style button that opens a dropdown to add a new filter. Returns null when
            no options remain.
          </p>
          <div className="flex items-center gap-3">
            <AddFilterButton
              options={addFilterOptions}
              onAdd={(id) => setAddedFilters([...addedFilters, id])}
            />
            {addedFilters.length > 0 && (
              <span className="text-tertiary text-xs">Added: {addedFilters.join(", ")}</span>
            )}
            {addFilterOptions.length === 0 && (
              <span className="text-tertiary text-xs">
                All options added.{" "}
                <button
                  type="button"
                  className="cursor-pointer underline"
                  onClick={() => setAddedFilters([])}
                >
                  Reset
                </button>
              </span>
            )}
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-filter-group" collapsible title="FilterGroup">
        <div className="space-y-3">
          <p className="text-secondary text-sm">
            Displays a filter label with a remove button and child content. Used inside
            FilterButton&apos;s popover to show each active filter.
          </p>
          <div className={cn("max-w-xs rounded-lg p-3", surfaceClass(2))}>
            <div className="flex flex-col gap-3">
              <FilterGroup label="Type" onRemove={() => {}}>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="elevation">Document</Badge>
                  <Badge variant="elevation">Image</Badge>
                </div>
              </FilterGroup>
              <FilterGroup label="Author" onRemove={() => {}}>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="elevation">Alice</Badge>
                </div>
              </FilterGroup>
            </div>
          </div>
        </div>
      </PanelCard>
    </>
  )
}
