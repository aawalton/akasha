"use client"

import { Badge } from "@akasha/design-badges/badge"
import { BadgeToggleGroup } from "@akasha/design-badges/badge-toggle-group"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { Text } from "@akasha/design-primitives/text-body"
import { LOCATION_OPTIONS } from "@akasha/temper-items-rules-core/location-filter"
import { SET_SOURCE_TYPE_OPTIONS } from "@akasha/temper-items-rules-core/set-sources-filter"
import type { ReactNode } from "react"
import type { RuleCardState } from "../rule-card-filter-chips-item-filter-id/rule-card-filter-chips-item-filter-id.module.code.ts"

interface TraitsChipProps {
  state: Pick<
    RuleCardState,
    "traitOptions" | "selectedTraitItems" | "handleTraitChange" | "handleRemoveFilter"
  >
}

export function TraitsChip({ state }: TraitsChipProps): ReactNode {
  const { traitOptions, selectedTraitItems, handleTraitChange, handleRemoveFilter } = state

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedTraitItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("traits")}
          removeLabel="Remove trait filter"
        >
          <span>
            {selectedTraitItems.length > 0
              ? `${selectedTraitItems.length} Trait${selectedTraitItems.length === 1 ? "" : "s"}`
              : "Select Traits"}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Traits
        </Text>
        <BadgeToggleGroup
          items={traitOptions}
          value={selectedTraitItems}
          onSelect={handleTraitChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}

interface SetSourcesChipProps {
  state: Pick<
    RuleCardState,
    "selectedSetSourceItems" | "handleSetSourceTypesChange" | "handleRemoveFilter"
  >
}

export function SetSourcesChip({ state }: SetSourcesChipProps): ReactNode {
  const { selectedSetSourceItems, handleSetSourceTypesChange, handleRemoveFilter } = state

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedSetSourceItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("set-sources")}
          removeLabel="Remove set sources filter"
        >
          <span>
            {selectedSetSourceItems.length > 0
              ? `${selectedSetSourceItems.length} Set Source${selectedSetSourceItems.length === 1 ? "" : "s"}`
              : "Select Set Sources"}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Set Sources
        </Text>
        <BadgeToggleGroup
          items={SET_SOURCE_TYPE_OPTIONS}
          value={selectedSetSourceItems}
          onSelect={handleSetSourceTypesChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}

interface LocationChipProps {
  state: Pick<
    RuleCardState,
    "selectedLocationItems" | "handleLocationChange" | "handleRemoveFilter"
  >
}

export function LocationChip({ state }: LocationChipProps): ReactNode {
  const { selectedLocationItems, handleLocationChange, handleRemoveFilter } = state

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={selectedLocationItems.length > 0 ? "accent" : "elevation-muted"}
          className="shrink-0 cursor-pointer"
          asChild
          onRemove={() => handleRemoveFilter("location")}
          removeLabel="Remove location filter"
        >
          <span>
            {selectedLocationItems.length > 0
              ? `${selectedLocationItems.length} Location${selectedLocationItems.length === 1 ? "" : "s"}`
              : "Select Locations"}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2">
        <Text variant="hint" className="font-medium">
          Locations
        </Text>
        <BadgeToggleGroup
          items={LOCATION_OPTIONS}
          value={selectedLocationItems}
          onSelect={handleLocationChange}
          unselectedVariant="elevation"
          wrap
        />
      </PopoverContent>
    </Popover>
  )
}
