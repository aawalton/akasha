"use client"

import {
  ALL_RACE_SOURCES,
  NO_RACE_SOURCE,
  type RaceSource,
  sortedRaces,
} from "@akasha/temper-character-build/race-source"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { getRaceIconUrl } from "@akasha/temper-races/race-icon-url"
import type { RaceId } from "@akasha/temper-races/races"
import { useMemo } from "react"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface RaceSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedRaceId: RaceId
  onSelect: (raceId: RaceId) => void
}

export function RaceSelectDialog({
  open,
  onOpenChange,
  selectedRaceId,
  onSelect,
}: RaceSelectDialogProps) {
  const config: FilterableSelectDialogConfig<RaceSource> = useMemo(
    () => ({
      title: "Select Race",
      searchPlaceholder: "Search races...",
      emptyMessage: "No races found.",
      categories: [{ id: "all", label: "Races", items: sortedRaces }],
      allItems: ALL_RACE_SOURCES,
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower)
        )
      },
      renderIcon: (item) => {
        const iconUrl = getRaceIconUrl(item.id)
        return iconUrl != null ? (
          <EquipmentIcon primarySrc={iconUrl} alt={item.name} size={40} />
        ) : null
      },
    }),
    []
  )

  const handleSelect = (itemId: RaceId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<RaceSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedRaceId}
      onSelect={handleSelect}
      defaultItem={NO_RACE_SOURCE}
      config={config}
    />
  )
}
