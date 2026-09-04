"use client"

import { AddSortButton } from "@akasha/design-patterns/add-sort-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import type { GroupOption } from "@akasha/design-patterns/group-button"
import { SortableSortList } from "@akasha/design-patterns/sort-group"
import type { SortEntry, SortOption } from "@akasha/design-patterns/sort-types"
import { FilterableList, FilterableListItem } from "@akasha/design-primitives/filterable-list"
import { Heading } from "@akasha/design-primitives/heading"
import { SubView } from "@akasha/design-primitives/sub-view"
import { GROUP_GRANULARITIES, type GroupGranularity } from "@akasha/pages-core/schema/view-data"
import { X } from "lucide-react"

const GRANULARITY_LABELS: Record<GroupGranularity, string> = {
  none: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
}

interface GroupByPickerProps {
  groupBy: string | null
  groupOptions: readonly GroupOption[]
  onGroupByChange: (value: string | null) => void
  groupSorts: readonly SortEntry[]
  onGroupSortsChange: (sorts: readonly SortEntry[]) => void
  groupSortOptions: readonly SortOption[]
  defaultGroupSorts: readonly SortEntry[] | ((groupValue: string) => readonly SortEntry[])
  groupGranularity?: GroupGranularity
  onGroupGranularityChange?: (granularity: GroupGranularity) => void
  granularityApplicable?: boolean
  onBack: () => void
}

export function GroupByPicker({
  groupBy,
  groupOptions,
  onGroupByChange,
  groupSorts,
  onGroupSortsChange,
  groupSortOptions,
  defaultGroupSorts,
  groupGranularity,
  onGroupGranularityChange,
  granularityApplicable,
  onBack,
}: GroupByPickerProps) {
  const activeGroupOption = groupOptions.find((o) => o.value === groupBy)
  const showGranularity = granularityApplicable === true && onGroupGranularityChange != null
  const activeGranularity = groupGranularity ?? "none"

  return (
    <SubView title="Group By" onBack={onBack}>
      {groupBy == null ? (
        <FilterableList>
          {groupOptions.map((option) => (
            <FilterableListItem
              key={option.value}
              onSelect={() => {
                onGroupByChange(option.value)
                const defaults =
                  typeof defaultGroupSorts === "function"
                    ? defaultGroupSorts(option.value)
                    : defaultGroupSorts
                onGroupSortsChange(defaults)
              }}
            >
              {option.label}
            </FilterableListItem>
          ))}
        </FilterableList>
      ) : (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex items-center justify-between gap-2">
            <Heading variant="label" className="truncate">
              {activeGroupOption?.label ?? String(groupBy)}
            </Heading>
            <button
              type="button"
              onClick={() => {
                onGroupByChange(null)
                onBack()
              }}
              aria-label={`Remove ${activeGroupOption?.label ?? groupBy} grouping`}
              className="cursor-pointer rounded p-1 text-tertiary transition-colors hover:text-primary"
            >
              <X className="size-4" />
            </button>
          </div>
          {showGranularity && onGroupGranularityChange != null && (
            <FilterGroup label="Date Grouping">
              <FilterableList>
                {GROUP_GRANULARITIES.map((g) => (
                  <FilterableListItem
                    key={g}
                    selected={g === activeGranularity}
                    onSelect={() => onGroupGranularityChange(g)}
                  >
                    {GRANULARITY_LABELS[g]}
                  </FilterableListItem>
                ))}
              </FilterableList>
            </FilterGroup>
          )}
          <SortableSortList
            rows={groupSorts.map((sort, index) => {
              const option = groupSortOptions.find((o) => o.value === sort.field)
              return {
                id: sort.field,
                label: option?.label ?? sort.field,
                direction: sort.direction,
                onDirectionChange: (dir) => {
                  const updated = groupSorts.map((s, i) =>
                    i === index ? { ...s, direction: dir } : s
                  )
                  onGroupSortsChange(updated)
                },
                onRemove: () => {
                  const remaining = groupSorts.filter((_, i) => i !== index)
                  if (remaining.length > 0) {
                    onGroupSortsChange(remaining)
                  } else {
                    const defaults: readonly SortEntry[] =
                      typeof defaultGroupSorts === "function" && groupBy != null
                        ? defaultGroupSorts(groupBy)
                        : typeof defaultGroupSorts === "function"
                          ? []
                          : defaultGroupSorts
                    onGroupSortsChange(defaults)
                  }
                },
              }
            })}
            onReorder={(nextFields) => {
              const next = nextFields.map((field) => {
                const existing = groupSorts.find((s) => s.field === field)
                if (!existing) {
                  throw new Error(`GroupByPicker reorder produced unknown field id: ${field}`)
                }
                return existing
              })
              onGroupSortsChange(next)
            }}
          />
          <AddSortButton
            options={groupSortOptions
              .filter((o) => !groupSorts.some((s) => s.field === o.value))
              .map((o) => ({ id: o.value, label: o.label }))}
            onAdd={(id: string) => {
              const selected = groupSortOptions.find((o) => o.value === id)
              onGroupSortsChange([
                ...groupSorts,
                { field: id, direction: selected?.defaultDirection ?? "asc" },
              ])
            }}
          />
        </div>
      )}
    </SubView>
  )
}
