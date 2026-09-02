"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import type { SortDirection, SortOption } from "@akasha/design-patterns/sort-types"
import type { CompletionSortMode } from "@akasha/temper-player-completion-ui/completion-panel-card"
import { useState } from "react"

type FilterId = "status" | "activity" | "character" | "skills"
const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>([
  "status",
  "activity",
  "character",
  "skills",
])
function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface CharactersFilterDef {
  id: FilterId
  label: string
}

const CHARACTERS_FILTERS: CharactersFilterDef[] = [
  { id: "status", label: "Status" },
  { id: "activity", label: "Activity" },
  { id: "character", label: "Character" },
  { id: "skills", label: "Skills" },
]

interface CharactersTabFiltersProps {
  title: string
  search: string
  sortOptions: readonly SortOption<CompletionSortMode>[]
  sortMode: CompletionSortMode
  sortDirection: SortDirection
  hasActiveFilters: boolean
  selectedStatus: readonly BadgeToggleGroupItem[]
  statusItems: readonly BadgeToggleGroupItem[]
  selectedActivity: readonly BadgeToggleGroupItem[]
  activityItems: readonly BadgeToggleGroupItem[]
  selectedCharacter: BadgeToggleGroupItem | null
  characterItems: readonly BadgeToggleGroupItem[]
  selectedSkillType: readonly BadgeToggleGroupItem[]
  skillTypeItems: readonly BadgeToggleGroupItem[]
  onReset: () => void
  onStatusSelect: (items: readonly BadgeToggleGroupItem[]) => void
  onActivitySelect: (items: readonly BadgeToggleGroupItem[]) => void
  onCharacterSelect: (items: readonly BadgeToggleGroupItem[]) => void
  onSkillTypeSelect: (items: readonly BadgeToggleGroupItem[]) => void
  onSortChange: (field: CompletionSortMode, direction: SortDirection) => void
  onSearchChange: (value: string) => void
}

export function CharactersTabFilters({
  title,
  search,
  sortOptions,
  sortMode,
  sortDirection,
  hasActiveFilters,
  selectedStatus,
  statusItems,
  selectedActivity,
  activityItems,
  selectedCharacter,
  characterItems,
  selectedSkillType,
  skillTypeItems,
  onReset,
  onStatusSelect,
  onActivitySelect,
  onCharacterSelect,
  onSkillTypeSelect,
  onSortChange,
  onSearchChange,
}: CharactersTabFiltersProps) {
  const hasStatusValue = selectedStatus.length > 0
  const hasActivityValue = selectedActivity.length > 0
  const hasCharacterValue = selectedCharacter !== null
  const hasSkillsValue = selectedSkillType.length > 0

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    if (hasStatusValue) initial.add("status")
    if (hasActivityValue) initial.add("activity")
    if (hasCharacterValue) initial.add("character")
    if (hasSkillsValue) initial.add("skills")
    return initial
  })

  const visibleFilters = CHARACTERS_FILTERS.filter(
    (f) =>
      addedFilters.has(f.id) ||
      (f.id === "status" && hasStatusValue) ||
      (f.id === "activity" && hasActivityValue) ||
      (f.id === "character" && hasCharacterValue) ||
      (f.id === "skills" && hasSkillsValue)
  )

  const availableFilters = CHARACTERS_FILTERS.filter(
    (f) =>
      !addedFilters.has(f.id) &&
      !(f.id === "status" && hasStatusValue) &&
      !(f.id === "activity" && hasActivityValue) &&
      !(f.id === "character" && hasCharacterValue) &&
      !(f.id === "skills" && hasSkillsValue)
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
    } else if (id === "character") {
      onCharacterSelect([])
    } else if (id === "skills") {
      onSkillTypeSelect([])
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <PageTabHeader title={title}>
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
          hasActiveFilters={
            hasStatusValue ||
            hasActivityValue ||
            hasCharacterValue ||
            hasSkillsValue ||
            addedFilters.size > 0
          }
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
                {filterDef.id === "character" && (
                  <BadgeToggleGroup
                    items={characterItems}
                    value={selectedCharacter ? [selectedCharacter] : []}
                    onSelect={onCharacterSelect}
                    unselectedVariant="elevation-muted"
                    wrap
                  />
                )}
                {filterDef.id === "skills" && (
                  <BadgeToggleGroup
                    items={skillTypeItems}
                    value={selectedSkillType}
                    onSelect={onSkillTypeSelect}
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
  )
}
