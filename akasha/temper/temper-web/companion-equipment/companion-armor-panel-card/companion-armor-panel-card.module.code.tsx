"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { ItemCard } from "@akasha/design-patterns/item-card"
import { HorizontalScrollFade } from "@akasha/design-primitives/horizontal-scroll-fade"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { groupByCount } from "@akasha/temper-build-support/row-grouping"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import {
  type CompanionArmorSlotId,
  companionArmorSlots,
} from "@akasha/temper-companions-core/companion-armor-slots"
import type { CompanionArmorWeight } from "@akasha/temper-companions-core/companion-armor-weights"
import { getCompanionArmorIcon } from "@akasha/temper-companions-core/companion-equipment-icons"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { companionEquipmentQualities } from "@akasha/temper-companions-core/companion-equipment-qualities"
import { AVAILABLE_QUALITY_OPTIONS } from "@akasha/temper-companions-core/companion-equipment-quality-rules"
import {
  type CompanionTraitId,
  companionTraits,
} from "@akasha/temper-companions-core/companion-traits"
import type { CompanionArmorSlotItem } from "@akasha/temper-companions-core/companion-types"
import {
  getQualityClassName,
  getQualityVariant,
} from "@akasha/temper-companions-ui/companion-quality-rules"
import { armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import { useMemo } from "react"
import { BulkEditTag } from "../companion-bulk-edit-tag/companion-bulk-edit-tag.module.code.tsx"
import type { CompanionEquipmentPanelProps } from "../companion-equipment-panel-types/companion-equipment-panel-types.module.code.ts"

const WEIGHT_OPTIONS: { id: CompanionArmorWeight; name: string }[] = [
  { id: "no-weight", name: "No Weight" },
  { id: "light", name: "Light" },
  { id: "medium", name: "Medium" },
  { id: "heavy", name: "Heavy" },
]

export function CompanionArmorPanelCard({
  equipment,
  onUpdate,
  readOnly,
}: CompanionEquipmentPanelProps) {
  const isCompanionArmorWeight = (v: string): v is CompanionArmorWeight =>
    WEIGHT_OPTIONS.some((opt) => opt.id === v)

  const handleArmorChange = (
    slotId: CompanionArmorSlotId,
    field: "weight" | "trait" | "quality",
    value: string
  ) => {
    const currentSlot = equipment.armor[slotId]
    const currentData = currentSlot.itemType === "armor" ? currentSlot.data : null

    const newSlot: CompanionArmorSlotItem = {
      itemType: "armor",
      data: {
        type: slotId,
        weight:
          field === "weight" && isCompanionArmorWeight(value)
            ? value
            : (currentData?.weight ?? "no-weight"),
        trait:
          field === "trait" && companionTraits.has(value)
            ? value
            : (currentData?.trait ?? "no-trait"),
        quality:
          field === "quality" && companionEquipmentQualities.has(value)
            ? value
            : (currentData?.quality ?? "no-quality"),
      },
    }

    onUpdate({
      armor: {
        ...equipment.armor,
        [slotId]: newSlot,
      },
    })
  }

  const armorSlotItems = useMemo(
    () => companionArmorSlots.list.map((slot) => equipment.armor[slot.id]),
    [equipment.armor]
  )

  const armorWeightCounts = useMemo(
    () =>
      groupByCount<(typeof armorSlotItems)[number], CompanionArmorWeight>(armorSlotItems, (item) =>
        item.itemType === "armor" ? item.data.weight : "no-weight"
      ),
    [armorSlotItems]
  )

  const armorTraitCounts = useMemo(
    () =>
      groupByCount<(typeof armorSlotItems)[number], CompanionTraitId>(armorSlotItems, (item) =>
        item.itemType === "armor" ? item.data.trait : "no-trait"
      ),
    [armorSlotItems]
  )

  const armorQualityCounts = useMemo(
    () =>
      groupByCount<(typeof armorSlotItems)[number], CompanionEquipmentQualityId>(
        armorSlotItems,
        (item) => (item.itemType === "armor" ? item.data.quality : "no-quality")
      ),
    [armorSlotItems]
  )

  const handleBulkArmorWeightUpdate = (
    oldValue: CompanionArmorWeight,
    newValue: CompanionArmorWeight
  ) => {
    const newArmor = { ...equipment.armor }
    for (const slot of companionArmorSlots.list) {
      const item = newArmor[slot.id]
      const effectiveWeight = item.itemType === "armor" ? item.data.weight : "no-weight"
      if (effectiveWeight === oldValue) {
        newArmor[slot.id] = {
          itemType: "armor",
          data: {
            type: slot.id,
            weight: newValue,
            trait: item.itemType === "armor" ? item.data.trait : "no-trait",
            quality: item.itemType === "armor" ? item.data.quality : "no-quality",
          },
        }
      }
    }
    onUpdate({ armor: newArmor })
  }

  const handleBulkArmorTraitUpdate = (oldValue: CompanionTraitId, newValue: CompanionTraitId) => {
    const newArmor = { ...equipment.armor }
    for (const slot of companionArmorSlots.list) {
      const item = newArmor[slot.id]
      const effectiveTrait = item.itemType === "armor" ? item.data.trait : "no-trait"
      if (effectiveTrait === oldValue) {
        newArmor[slot.id] = {
          itemType: "armor",
          data: {
            type: slot.id,
            weight: item.itemType === "armor" ? item.data.weight : "no-weight",
            trait: newValue,
            quality: item.itemType === "armor" ? item.data.quality : "no-quality",
          },
        }
      }
    }
    onUpdate({ armor: newArmor })
  }

  const handleBulkArmorQualityUpdate = (
    oldValue: CompanionEquipmentQualityId,
    newValue: CompanionEquipmentQualityId
  ) => {
    const newArmor = { ...equipment.armor }
    for (const slot of companionArmorSlots.list) {
      const item = newArmor[slot.id]
      const effectiveQuality = item.itemType === "armor" ? item.data.quality : "no-quality"
      if (effectiveQuality === oldValue) {
        newArmor[slot.id] = {
          itemType: "armor",
          data: {
            type: slot.id,
            weight: item.itemType === "armor" ? item.data.weight : "no-weight",
            trait: item.itemType === "armor" ? item.data.trait : "no-trait",
            quality: newValue,
          },
        }
      }
    }
    onUpdate({ armor: newArmor })
  }

  return (
    <PanelCard
      id="companion-armor"
      collapsible
      title="Armor"
      headerSubtitle={
        <div className="flex flex-wrap gap-1">
          {armorQualityCounts.map(([quality, count]) => (
            <BulkEditTag
              key={`quality-${quality}`}
              currentValue={quality}
              options={AVAILABLE_QUALITY_OPTIONS}
              onSelect={handleBulkArmorQualityUpdate}
              count={count}
              disabled={readOnly}
              getVariant={(q) => getQualityVariant(q, "elevation-muted")}
              getItemClassName={getQualityClassName}
            />
          ))}
          {armorWeightCounts.map(([weight, count]) => (
            <BulkEditTag
              key={`weight-${weight}`}
              currentValue={weight}
              options={WEIGHT_OPTIONS}
              onSelect={handleBulkArmorWeightUpdate}
              count={count}
              disabled={readOnly}
            />
          ))}
          {armorTraitCounts.map(([trait, count]) => (
            <BulkEditTag
              key={`trait-${trait}`}
              currentValue={trait}
              options={companionTraits.list}
              onSelect={handleBulkArmorTraitUpdate}
              count={count}
              disabled={readOnly}
            />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {companionArmorSlots.list.map((slot) => {
          const armorSlot = equipment.armor[slot.id]
          const armorData = armorSlot.itemType === "armor" ? armorSlot.data : null

          return (
            <ItemCard
              key={slot.id}
              renderIcon={() => (
                <EquipmentIcon
                  primarySrc={getCompanionArmorIcon(slot.id, armorData?.weight ?? "no-weight")}
                  fallbackSrc={armorSlots.has(slot.id) ? armorSlots.data[slot.id].icon : undefined}
                  alt={slot.name}
                />
              )}
              renderContent={() => (
                <div className="space-y-1">
                  <div className="font-medium text-sm">{slot.name}</div>
                  <HorizontalScrollFade>
                    <div className="flex gap-1">
                      <Select
                        value={armorData?.quality ?? "no-quality"}
                        onValueChange={(value) => handleArmorChange(slot.id, "quality", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant={getQualityVariant(armorData?.quality ?? "no-quality")}>
                            <SelectValue placeholder="No Quality" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent nullSentinel={{ value: "no-quality", label: "No Quality" }}>
                          {AVAILABLE_QUALITY_OPTIONS.filter(
                            (quality) => quality.id !== "no-quality"
                          ).map((quality) => (
                            <SelectItem
                              key={quality.id}
                              value={quality.id}
                              className={getQualityClassName(quality.id)}
                            >
                              {quality.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={armorData?.weight ?? "no-weight"}
                        onValueChange={(value) => handleArmorChange(slot.id, "weight", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant="elevation-muted">
                            <SelectValue placeholder="No Weight" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent nullSentinel={{ value: "no-weight", label: "No Weight" }}>
                          {WEIGHT_OPTIONS.filter((weight) => weight.id !== "no-weight").map(
                            (weight) => (
                              <SelectItem key={weight.id} value={weight.id}>
                                {weight.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <Select
                        value={armorData?.trait ?? "no-trait"}
                        onValueChange={(value) => handleArmorChange(slot.id, "trait", value)}
                        disabled={readOnly}
                      >
                        <SelectTrigger hideChevron>
                          <Badge variant="elevation-muted">
                            <SelectValue placeholder="No Trait" />
                          </Badge>
                        </SelectTrigger>
                        <SelectContent
                          nullSentinel={{ value: "no-trait", label: "No Trait" }}
                          sorted
                        >
                          {companionTraits.list
                            .filter((trait) => trait.id !== "no-trait")
                            .map((trait) => (
                              <SelectItem key={trait.id} value={trait.id}>
                                {trait.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </HorizontalScrollFade>
                </div>
              )}
            />
          )
        })}
      </div>
    </PanelCard>
  )
}
