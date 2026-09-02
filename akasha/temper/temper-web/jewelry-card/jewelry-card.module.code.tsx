"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ItemCard } from "@akasha/design-patterns/item-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import {
  convertIconPathToUrl,
  getEquipmentIcon,
} from "@akasha/temper-characters-equipment/get-equipment-icon"
import type { JewelryItem } from "@akasha/temper-characters-equipment/item-composites"
import {
  type JewelryEnchantId,
  jewelryEnchants,
} from "@akasha/temper-characters-equipment/jewelry-enchants"
import { getValidSetsForSlot } from "@akasha/temper-characters-equipment/set-pattern-matcher"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import {
  AVAILABLE_QUALITY_OPTIONS,
  getQualityClassName,
  getQualityLabel,
  getQualityVariant,
} from "@akasha/temper-characters-equipment-ui/equipment-quality-rules"
import {
  type JewelryTraitId,
  jewelryTraits,
  jewelryTraitsBuildList,
} from "@akasha/temper-equipment/jewelry-traits"
import type { SetId as SetsAllId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate as SetsAll } from "@akasha/temper-equipment/set-template"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { type JewelrySlotId, jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { useMemo, useState } from "react"
import { getSetById, SetSelectDialog } from "../set-select-dialog/set-select-dialog.module.code.tsx"

export type JewelryUpdateParams = Partial<JewelryItem>

interface JewelryCardProps {
  slot: JewelrySlotId
  item: CharacterState["equipment"]["jewelry"][JewelrySlotId]
  availableSets: readonly SetsAll[]
  equippedMythicSetId: string | null
  onUpdate: (updates: JewelryUpdateParams) => void
  onRemove: () => void
  playerClass?: ClassId | null
  readOnly?: boolean
}

export function JewelryCard({
  slot,
  item,
  availableSets,
  equippedMythicSetId,
  onUpdate,
  onRemove,
  playerClass,
  readOnly,
}: JewelryCardProps) {
  const [isSetDialogOpen, setIsSetDialogOpen] = useState(false)

  const itemData = item.itemType === "jewelry" ? item.data : null
  const currentSetId = itemData?.set ?? "no-set"
  const selectedSet = getSetById(currentSetId, availableSets) ?? null

  const hasValues =
    (itemData?.set != null && itemData.set !== "no-set") ||
    (itemData?.trait != null && itemData.trait !== "no-trait") ||
    (itemData?.enchantment != null && itemData.enchantment !== "no-enchant")

  const jewelryType = jewelrySlots.data[slot].typeId
  const setIconPath = getEquipmentIcon(selectedSet, jewelryType)
  const iconPath = convertIconPathToUrl(setIconPath)

  const slotConfig = jewelrySlots.list.find((s) => s.id === slot)
  const name = slotConfig?.name ?? slot

  const setsValidForSlot = useMemo(() => {
    return getValidSetsForSlot(availableSets, slot, jewelryType, null)
  }, [availableSets, slot, jewelryType])

  const handleSetSelect = (setId: SetsAllId) => {
    const newSet = getSetById(setId, availableSets)
    const quality: EquipmentQualityOptionId | undefined =
      newSet?.subcategoryId === "mythic" ? "mythic" : undefined
    onUpdate({ set: setId, ...(quality != null && { quality }) })
  }

  return (
    <>
      <ItemCard
        renderIcon={() => (
          <EquipmentIcon
            primarySrc={iconPath}
            fallbackSrc={jewelrySlots.data[slot].icon}
            alt={slot}
          />
        )}
        renderContent={() => (
          <div className="space-y-1">
            <div className="font-medium text-sm">{name}</div>
            <div>
              <div className="flex flex-wrap items-center gap-1">
                <Select<EquipmentQualityOptionId>
                  value={itemData?.quality ?? "no-quality"}
                  onValueChange={(v) => onUpdate({ quality: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge
                      variant={getQualityVariant(itemData?.quality ?? "no-quality")}
                      className="shrink-0"
                    >
                      {getQualityLabel(itemData?.quality ?? "no-quality")}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-quality", label: "No Quality" }}>
                    {AVAILABLE_QUALITY_OPTIONS.filter((option) => option.id !== "no-quality").map(
                      (option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id}
                          className={getQualityClassName(option.id)}
                        >
                          {option.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  className="cursor-pointer outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[var(--state-disabled-content)] focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
                  onClick={() => setIsSetDialogOpen(true)}
                  disabled={readOnly}
                >
                  <Badge variant="elevation-muted" className="shrink-0">
                    {selectedSet?.name ?? "No Set"}
                  </Badge>
                </button>
                <Select<JewelryTraitId>
                  value={itemData?.trait ?? "no-trait"}
                  onValueChange={(v) => onUpdate({ trait: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Trait" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-trait", label: "No Trait" }} sorted>
                    {(() => {
                      const currentTrait = itemData?.trait ?? "no-trait"
                      const traitOptions = jewelryTraitsBuildList.some((t) => t.id === currentTrait)
                        ? jewelryTraitsBuildList
                        : jewelryTraits.has(currentTrait)
                          ? [...jewelryTraitsBuildList, jewelryTraits.data[currentTrait]]
                          : jewelryTraitsBuildList
                      return traitOptions
                        .filter((option) => option.id !== "no-trait")
                        .map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))
                    })()}
                  </SelectContent>
                </Select>
                <Select<JewelryEnchantId>
                  value={itemData?.enchantment ?? "no-enchant"}
                  onValueChange={(v) => onUpdate({ enchantment: v })}
                  disabled={readOnly}
                >
                  <SelectTrigger hideChevron>
                    <Badge variant="elevation-muted" className="shrink-0">
                      <SelectValue placeholder="No Enchant" />
                    </Badge>
                  </SelectTrigger>
                  <SelectContent nullSentinel={{ value: "no-enchant", label: "No Enchant" }} sorted>
                    {jewelryEnchants.list
                      .filter((option) => option.id !== "no-enchant")
                      .map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        onRemove={!readOnly && hasValues ? onRemove : undefined}
        removeLabel={`Remove ${name}`}
      />

      {!readOnly && (
        <SetSelectDialog
          open={isSetDialogOpen}
          onOpenChange={setIsSetDialogOpen}
          selectedSetId={currentSetId}
          onSelect={handleSetSelect}
          availableSets={setsValidForSlot}
          playerClass={playerClass}
          equippedMythicSetId={equippedMythicSetId}
        />
      )}
    </>
  )
}
