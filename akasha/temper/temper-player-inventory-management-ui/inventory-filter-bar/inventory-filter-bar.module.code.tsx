"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { TRAIT_OPTIONS_BY_FAMILY } from "@akasha/temper-items-rules-core/traits-filter"
import { useState } from "react"
import {
  type InventoryViewFilterDef,
  QUALITY_FILTER_ITEMS,
  SORT_OPTIONS,
  type SortField,
  type ViewFilterId,
  type ViewFilterPopoverProps,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"

type TraitFamilyKey = "armor" | "weapon" | "jewelry" | "companion"

const TRAIT_FAMILY_CONFIG: {
  id: ViewFilterId
  label: string
  familyKey: TraitFamilyKey
  getProp: (props: ViewFilterPopoverProps) => readonly string[]
  getOnChange: (props: ViewFilterPopoverProps) => (traits: readonly string[]) => void
}[] = [
  {
    id: "armor-traits",
    label: "Armor Traits",
    familyKey: "armor",
    getProp: (p) => p.armorTraits,
    getOnChange: (p) => p.onArmorTraitsChange,
  },
  {
    id: "weapon-traits",
    label: "Weapon Traits",
    familyKey: "weapon",
    getProp: (p) => p.weaponTraits,
    getOnChange: (p) => p.onWeaponTraitsChange,
  },
  {
    id: "jewelry-traits",
    label: "Jewelry Traits",
    familyKey: "jewelry",
    getProp: (p) => p.jewelryTraits,
    getOnChange: (p) => p.onJewelryTraitsChange,
  },
  {
    id: "companion-traits",
    label: "Companion Traits",
    familyKey: "companion",
    getProp: (p) => p.companionTraits,
    getOnChange: (p) => p.onCompanionTraitsChange,
  },
]

function traitFamilyFilter(config: (typeof TRAIT_FAMILY_CONFIG)[number]): InventoryViewFilterDef {
  const { id, label, familyKey, getProp, getOnChange } = config
  const familyOptions = TRAIT_OPTIONS_BY_FAMILY[familyKey] ?? []

  return {
    id,
    label,
    hasValue: (props) => getProp(props).length > 0,
    renderGroup: (props: ViewFilterPopoverProps) => {
      const traits = getProp(props)
      const onTraitsChange = getOnChange(props)
      const selectedItems = familyOptions.filter((opt) => traits.includes(opt.value))

      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        onTraitsChange(items.map((i) => i.value))
      }

      return (
        <BadgeToggleGroup
          items={familyOptions}
          value={selectedItems}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  }
}

const INVENTORY_VIEW_FILTERS: InventoryViewFilterDef[] = [
  {
    id: "quality",
    label: "Quality",
    hasValue: ({ qualities }) => qualities.length > 0,
    renderGroup: ({ qualities, onQualitiesChange }: ViewFilterPopoverProps) => {
      const selectedItems = QUALITY_FILTER_ITEMS.filter((item) =>
        qualities.includes(Number(item.value))
      )
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        onQualitiesChange(items.map((item) => Number(item.value)))
      }
      return (
        <BadgeToggleGroup
          items={QUALITY_FILTER_ITEMS}
          value={selectedItems}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
  ...TRAIT_FAMILY_CONFIG.map(traitFamilyFilter),
]

interface InventoryFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  qualities: readonly number[]
  onQualitiesChange: (qualities: readonly number[]) => void
  armorTraits: readonly string[]
  onArmorTraitsChange: (traits: readonly string[]) => void
  weaponTraits: readonly string[]
  onWeaponTraitsChange: (traits: readonly string[]) => void
  jewelryTraits: readonly string[]
  onJewelryTraitsChange: (traits: readonly string[]) => void
  companionTraits: readonly string[]
  onCompanionTraitsChange: (traits: readonly string[]) => void
  sortBy: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField, direction: SortDirection) => void
  hasActiveFilters: boolean
  onReset: () => void
}

export function InventoryFilterBar({
  search,
  onSearchChange,
  qualities,
  onQualitiesChange,
  armorTraits,
  onArmorTraitsChange,
  weaponTraits,
  onWeaponTraitsChange,
  jewelryTraits,
  onJewelryTraitsChange,
  companionTraits,
  onCompanionTraitsChange,
  sortBy,
  sortDirection,
  onSortChange,
  hasActiveFilters,
  onReset,
}: InventoryFilterBarProps) {
  const popoverProps: ViewFilterPopoverProps = {
    qualities,
    armorTraits,
    weaponTraits,
    jewelryTraits,
    companionTraits,
    onQualitiesChange,
    onArmorTraitsChange,
    onWeaponTraitsChange,
    onJewelryTraitsChange,
    onCompanionTraitsChange,
  }

  const [addedFilters, setAddedFilters] = useState<Set<ViewFilterId>>(() => {
    const initial = new Set<ViewFilterId>()
    for (const f of INVENTORY_VIEW_FILTERS) {
      if (f.hasValue(popoverProps)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = INVENTORY_VIEW_FILTERS.filter(
    (f) => addedFilters.has(f.id) || f.hasValue(popoverProps)
  )

  const availableFilters = INVENTORY_VIEW_FILTERS.filter(
    (f) => !addedFilters.has(f.id) && !f.hasValue(popoverProps)
  )

  function handleAdd(id: string) {
    const filter = INVENTORY_VIEW_FILTERS.find((f) => f.id === id)
    if (!filter) return
    setAddedFilters((prev) => new Set(prev).add(filter.id))
  }

  function handleRemove(id: ViewFilterId) {
    if (id === "quality") {
      onQualitiesChange([])
    } else if (id === "armor-traits") {
      onArmorTraitsChange([])
    } else if (id === "weapon-traits") {
      onWeaponTraitsChange([])
    } else if (id === "jewelry-traits") {
      onJewelryTraitsChange([])
    } else if (id === "companion-traits") {
      onCompanionTraitsChange([])
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const hasActiveFilterValues =
    qualities.length > 0 ||
    armorTraits.length > 0 ||
    weaponTraits.length > 0 ||
    jewelryTraits.length > 0 ||
    companionTraits.length > 0

  return (
    <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={onReset}>
      <SearchButton value={search} onChange={onSearchChange} placeholder="Search items..." />

      <SortButton
        options={SORT_OPTIONS}
        sorts={[{ field: sortBy, direction: sortDirection }]}
        onSortsChange={(sorts) => {
          const first = sorts[0]
          if (first) onSortChange(first.field, first.direction)
        }}
        defaultSort={{ field: "name", direction: "asc" }}
      />

      <FilterButton
        hasActiveFilters={hasActiveFilterValues}
        popoverClassName="w-72"
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
              {filterDef.renderGroup(popoverProps)}
            </FilterGroup>
          ))}
          <AddFilterButton
            options={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
            onAdd={handleAdd}
          />
        </div>
      </FilterButton>
    </SearchSortFilterRow>
  )
}
