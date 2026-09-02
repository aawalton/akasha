"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { MultiSelect, type MultiSelectItem } from "@akasha/design-forms/multi-select"
import {
  SearchMultiSelect,
  type SearchMultiSelectItem,
} from "@akasha/design-forms/search-multi-select"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { Heading } from "@akasha/design-primitives/heading"
import { useState } from "react"

const FIRST_MULTI_SELECT_ITEM: MultiSelectItem = { value: "warrior", label: "Warrior" }
const MULTI_SELECT_ITEMS: MultiSelectItem[] = [
  FIRST_MULTI_SELECT_ITEM,
  { value: "mage", label: "Mage" },
  { value: "rogue", label: "Rogue" },
  { value: "healer", label: "Healer" },
  { value: "tank", label: "Tank" },
]

const SEARCH_MULTI_SELECT_ITEMS: SearchMultiSelectItem[] = [
  { value: "fire-staff", label: "Fire Staff" },
  { value: "frost-staff", label: "Frost Staff" },
  { value: "lightning-staff", label: "Lightning Staff" },
  { value: "restoration-staff", label: "Restoration Staff" },
  { value: "two-handed", label: "Two Handed" },
  { value: "one-hand-shield", label: "One Hand and Shield" },
  { value: "dual-wield", label: "Dual Wield" },
  { value: "bow", label: "Bow" },
]

const BADGE_TOGGLE_ITEMS: BadgeToggleGroupItem[] = [
  { value: "stamina", label: "Stamina" },
  { value: "magicka", label: "Magicka" },
  { value: "health", label: "Health" },
  { value: "hybrid", label: "Hybrid" },
]

export function ComponentsSelectionPanels() {
  const [multiSelectValue, setMultiSelectValue] = useState<readonly MultiSelectItem[]>([])
  const [multiSelectSmValue, setMultiSelectSmValue] = useState<readonly MultiSelectItem[]>([])

  const [searchMultiSelectValue, setSearchMultiSelectValue] = useState<
    readonly SearchMultiSelectItem[]
  >([])
  const [searchMultiSearch, setSearchMultiSearch] = useState("")

  const [badgeToggleValue, setBadgeToggleValue] = useState<readonly BadgeToggleGroupItem[]>([])
  const [badgeToggleWrapValue, setBadgeToggleWrapValue] = useState<readonly BadgeToggleGroupItem[]>(
    []
  )

  const [searchValue, setSearchValue] = useState("")

  const filteredSearchItems = SEARCH_MULTI_SELECT_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchMultiSearch.toLowerCase())
  )

  return (
    <>
      {}
      <PanelCard id="ds-multi-select" collapsible title="MultiSelect">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading>Default</Heading>
            <div className="max-w-xs">
              <MultiSelect
                items={MULTI_SELECT_ITEMS}
                value={multiSelectValue}
                onSelect={setMultiSelectValue}
                caption="Select roles..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Heading>Small + Collapse on Select</Heading>
            <div className="max-w-xs">
              <MultiSelect
                items={MULTI_SELECT_ITEMS}
                value={multiSelectSmValue}
                onSelect={setMultiSelectSmValue}
                caption="Select roles..."
                size="sm"
                collapseOnSelect
              />
            </div>
          </div>
          <div className="space-y-2">
            <Heading>Disabled</Heading>
            <div className="max-w-xs">
              <MultiSelect
                items={MULTI_SELECT_ITEMS}
                value={[FIRST_MULTI_SELECT_ITEM]}
                onSelect={() => {}}
                caption="Select roles..."
                disabled
              />
            </div>
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-search-multi-select" collapsible title="SearchMultiSelect">
        <div className="space-y-2">
          <p className="text-secondary text-sm">
            Multi-select with a built-in search input. Items are filtered as the user types.
          </p>
          <div className="max-w-xs">
            <SearchMultiSelect
              items={filteredSearchItems}
              value={searchMultiSelectValue}
              onSelect={setSearchMultiSelectValue}
              searchValue={searchMultiSearch}
              onSearchValueChange={setSearchMultiSearch}
              caption="Select weapons..."
            />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-badge-toggle-group" collapsible title="BadgeToggleGroup">
        <div className="space-y-4">
          <div className="space-y-2">
            <Heading>Horizontal Scroll</Heading>
            <BadgeToggleGroup
              items={BADGE_TOGGLE_ITEMS}
              value={badgeToggleValue}
              onSelect={setBadgeToggleValue}
            />
          </div>
          <div className="space-y-2">
            <Heading>Wrap + Custom Variants</Heading>
            <BadgeToggleGroup
              items={BADGE_TOGGLE_ITEMS}
              value={badgeToggleWrapValue}
              onSelect={setBadgeToggleWrapValue}
              wrap
              unselectedVariant="elevation"
              selectedVariant="accent"
            />
          </div>
        </div>
      </PanelCard>

      {}
      <PanelCard id="ds-search-button" collapsible title="SearchButton">
        <div className="space-y-2">
          <p className="text-secondary text-sm">
            Expandable search input. Collapses to an icon button, expands on click.
          </p>
          <SearchButton
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search components..."
          />
        </div>
      </PanelCard>
    </>
  )
}
