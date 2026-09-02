"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { LayoutLink } from "@akasha/design-layout/router-context"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { Globe } from "lucide-react"
import { useState } from "react"
import {
  ACCOUNT_FILTERS,
  type FilterId,
  isFilterId,
} from "../account-filters/account-filters.module.code.ts"
import { AccountPanelGrid } from "../account-panel-grid/account-panel-grid.module.code.tsx"
import type { AccountProgressData } from "../account-progress/account-progress.module.code.ts"
import { useCompletionToolbar } from "../completion-toolbar-context/completion-toolbar-context.module.code.tsx"

interface CompletionAccountTabProps {
  active: boolean
  accountSummary: AccountSummaryData
  accountProgress: AccountProgressData
  activityCategoryFilter: readonly ActivityCategoryId[]
  selectedActivity: readonly BadgeToggleGroupItem[]
  activityItems: readonly BadgeToggleGroupItem[]
  onActivitySelect: (items: readonly BadgeToggleGroupItem[]) => void
}

export function CompletionAccountTab({
  active,
  accountSummary,
  accountProgress,
  activityCategoryFilter,
  selectedActivity,
  activityItems,
  onActivitySelect,
}: CompletionAccountTabProps) {
  const {
    completionFilter,
    sortMode,
    sortDirection,
    sortOptions,
    search,
    selectedStatus,
    statusItems,
    hasActiveFilters,
    onReset,
    onStatusSelect,
    onSortChange,
    onSearchChange,
  } = useCompletionToolbar()

  const { measured } = accountProgress

  const hasStatusValue = selectedStatus.length > 0
  const hasActivityValue = selectedActivity.length > 0

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    if (hasStatusValue) initial.add("status")
    if (hasActivityValue) initial.add("activity")
    return initial
  })

  if (!measured) {
    return (
      <TabsContent value="account">
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Account" />
          <Card>
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Globe />
                  </EmptyMedia>
                  <EmptyTitle>Account data not received</EmptyTitle>
                  <EmptyDescription>
                    Nothing account-wide has reached Temper for this account yet, so there is
                    nothing to measure here. This is not a score of zero — these figures are
                    unknown, not low.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="accent" asChild>
                    <LayoutLink href="/watcher">Get Started</LayoutLink>
                  </Button>
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    )
  }

  const visibleFilters = ACCOUNT_FILTERS.filter(
    (f) =>
      addedFilters.has(f.id) ||
      (f.id === "status" && hasStatusValue) ||
      (f.id === "activity" && hasActivityValue)
  )

  const availableFilters = ACCOUNT_FILTERS.filter(
    (f) =>
      !addedFilters.has(f.id) &&
      !(f.id === "status" && hasStatusValue) &&
      !(f.id === "activity" && hasActivityValue)
  )

  function handleAdd(id: string) {
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(id: FilterId) {
    if (id === "status") {
      onStatusSelect([])
    } else if (id === "activity") {
      onActivitySelect([])
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <TabsContent value="account">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Account">
            <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={onReset}>
              <SearchButton value={search} onChange={onSearchChange} placeholder="Search..." />
              <SortButton
                options={sortOptions}
                sorts={[{ field: sortMode, direction: sortDirection }]}
                onSortsChange={(sorts) => {
                  const first = sorts[0]
                  if (first) onSortChange(first.field, first.direction)
                }}
                defaultSort={{ field: "status", direction: "asc" }}
              />
              <FilterButton
                hasActiveFilters={hasStatusValue || hasActivityValue || addedFilters.size > 0}
                emptySelectOptions={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
                onEmptySelect={handleAdd}
              >
                <div className="flex flex-col gap-3">
                  {visibleFilters.map((filterDef) => (
                    <FilterGroup
                      key={filterDef.id}
                      label={filterDef.label}
                      onRemove={() => handleRemove(filterDef.id)}
                    >
                      {filterDef.id === "status" && (
                        <BadgeToggleGroup
                          items={statusItems}
                          value={selectedStatus}
                          onSelect={onStatusSelect}
                          unselectedVariant="elevation-muted"
                          wrap
                        />
                      )}
                      {filterDef.id === "activity" && (
                        <BadgeToggleGroup
                          items={activityItems}
                          value={selectedActivity}
                          onSelect={onActivitySelect}
                          unselectedVariant="elevation-muted"
                          wrap
                        />
                      )}
                    </FilterGroup>
                  ))}
                  <AddFilterButton
                    options={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
                    onAdd={handleAdd}
                  />
                </div>
              </FilterButton>
            </SearchSortFilterRow>
          </PageTabHeader>
          <AccountPanelGrid
            accountSummary={accountSummary}
            accountProgress={accountProgress}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
