"use client"

import { convertIconPathToUrl } from "@akasha/temper-characters-equipment/get-equipment-icon"
import { canClassEquipSet } from "@akasha/temper-characters-equipment/set-class-restrictions"
import {
  createSetSelectConfig,
  getMaxBonusPieceCount,
  NO_SET_SOURCE,
} from "@akasha/temper-characters-equipment/set-select-helpers"
import {
  isSetSourceId,
  type SetSource,
  type SetSourceId,
} from "@akasha/temper-characters-equipment/set-source"
import { isSetsAllId } from "@akasha/temper-characters-equipment/sets-all"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import type { SetId as SetsAllId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate as SetsAll } from "@akasha/temper-equipment/set-template"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { typedPartialRecordKeys } from "@akasha/temper-formula-framework/record-parts"
import { Shield } from "lucide-react"
import { useMemo } from "react"
import { FilterableSelectDialog } from "../filterable-select-dialog/filterable-select-dialog.module.code.tsx"

interface SetSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSetId: SetsAllId
  onSelect: (setId: SetsAllId) => void
  availableSets: readonly SetsAll[]
  playerClass?: ClassId | null
  equippedMythicSetId?: string | null
}

export function getSetById(id: SetsAllId, sets: readonly SetsAll[]): SetsAll | undefined {
  if (id === "no-set") return undefined
  return sets.find((s) => s.id === id)
}

export function SetSelectDialog({
  open,
  onOpenChange,
  selectedSetId,
  onSelect,
  availableSets,
  playerClass = null,
  equippedMythicSetId = null,
}: SetSelectDialogProps) {
  const classFilteredSets = useMemo(() => {
    return availableSets.filter((set) => {
      if (set.subcategoryId === "none") {
        return false
      }
      if (playerClass != null && !canClassEquipSet(set, playerClass)) {
        return false
      }
      if (
        set.subcategoryId === "mythic" &&
        equippedMythicSetId != null &&
        equippedMythicSetId !== selectedSetId
      ) {
        return false
      }
      return true
    })
  }, [availableSets, playerClass, equippedMythicSetId, selectedSetId])

  const selectedSetSourceId = useMemo<SetSourceId>(() => {
    const selectedSet = availableSets.find((s) => s.id === selectedSetId)
    const pieceCount = selectedSet ? getMaxBonusPieceCount(selectedSet) : 1
    const candidate = `set-${selectedSetId}-${pieceCount}`
    return isSetSourceId(candidate) ? candidate : NO_SET_SOURCE.id
  }, [selectedSetId, availableSets])

  const extractSetId = (setSourceId: SetSourceId): SetsAllId => {
    const stripped = setSourceId.replace(/^set-/, "").replace(/-\d+$/, "")
    return isSetsAllId(stripped) ? stripped : selectedSetId
  }

  const handleSelect = (setSourceId: SetSourceId) => {
    const setId = extractSetId(setSourceId)
    onSelect(setId)
  }

  const config = useMemo(() => {
    const baseConfig = createSetSelectConfig(classFilteredSets)
    return {
      ...baseConfig,
      renderIcon: (item: SetSource) => {
        const originalSet = availableSets.find((set) => set.id === item.setId)

        if (!originalSet || !("icons" in originalSet) || !originalSet.icons) {
          return <Shield className="h-5 w-5" />
        }

        const firstSlot = [...typedPartialRecordKeys(originalSet.icons)].sort()[0]
        const iconPath =
          originalSet.icons["*"] ??
          originalSet.icons["weapon:*"] ??
          originalSet.icons["armor:*"] ??
          (firstSlot === undefined ? undefined : originalSet.icons[firstSlot])

        if (iconPath == null) {
          return <Shield className="h-5 w-5" />
        }

        const iconUrl = convertIconPathToUrl(iconPath)

        return <EquipmentIcon primarySrc={iconUrl} fallbackSrc={null} alt={item.name} size={40} />
      },
    }
  }, [classFilteredSets, availableSets])

  return (
    <FilterableSelectDialog<SetSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedSetSourceId}
      onSelect={handleSelect}
      defaultItem={NO_SET_SOURCE}
      config={config}
    />
  )
}
