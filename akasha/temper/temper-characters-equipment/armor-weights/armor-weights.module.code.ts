import type {
  ArmorWeightId,
  StandardArmorWeightId,
} from "@akasha/temper-equipment/armor-weight-ids"
import { type ArmorTypeId, getArmorMultiplier } from "@akasha/temper-equipment-kinds/armor-types"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import {
  calculateNirnhonedValue,
  calculateReinforcedValue,
} from "../armor-trait-effects/armor-trait-effects.module.code.ts"
import type { ArmorItem, ItemLevel } from "../item-composites/item-composites.module.code.ts"
import { getArmorBaseValueForLevel } from "../level-scaling/level-scaling.module.code.ts"
export const TEMPER_ARMOR_WEIGHTS_BY_ID = {
  "heavy": {
    id: "heavy" as const,
    name: "Heavy",
    baseValue: 346.5,
    skillLineId: "armor-heavy-armor" as const,
    isStandard: true,
  },
  "light": {
    id: "light" as const,
    name: "Light",
    baseValue: 174.5,
    skillLineId: "armor-light-armor" as const,
    isStandard: true,
  },
  "medium": {
    id: "medium" as const,
    name: "Medium",
    baseValue: 260.5,
    skillLineId: "armor-medium-armor" as const,
    isStandard: true,
  },
  "no-weight": {
    id: "no-weight" as const,
    name: "No Weight",
    baseValue: 0,
    skillLineId: "no-skill-line" as const,
    isStandard: true,
  },
  "shield": {
    id: "shield" as const,
    name: "Shield",
    baseValue: 1720,
    skillLineId: "weapon-one-hand-and-shield" as const,
    isStandard: false,
  },
} as const satisfies Record<string, ArmorWeightTemplate>

export const STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID = {
  "heavy": {
    id: "heavy" as const,
    name: "Heavy",
    baseValue: 346.5,
    skillLineId: "armor-heavy-armor" as const,
    isStandard: true,
  },
  "light": {
    id: "light" as const,
    name: "Light",
    baseValue: 174.5,
    skillLineId: "armor-light-armor" as const,
    isStandard: true,
  },
  "medium": {
    id: "medium" as const,
    name: "Medium",
    baseValue: 260.5,
    skillLineId: "armor-medium-armor" as const,
    isStandard: true,
  },
  "no-weight": {
    id: "no-weight" as const,
    name: "No Weight",
    baseValue: 0,
    skillLineId: "no-skill-line" as const,
    isStandard: true,
  },
} as const satisfies Record<string, ArmorWeightTemplate>

export interface ArmorWeightTemplate {
  id: ArmorWeightId
  name: string
  baseValue: number
  skillLineId:
    | "no-skill-line"
    | "armor-light-armor"
    | "armor-medium-armor"
    | "armor-heavy-armor"
    | "weapon-one-hand-and-shield"
  isStandard: boolean
}

export const armorWeights: DataFile<ArmorWeightId, ArmorWeightTemplate> =
  createDataFile<ArmorWeightTemplate>()(TEMPER_ARMOR_WEIGHTS_BY_ID)

export const standardArmorWeights: DataFile<
  StandardArmorWeightId,
  ArmorWeightTemplate & { id: StandardArmorWeightId }
> = createDataFile<ArmorWeightTemplate>()(STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID)

const BASE_ARMOR_QUALITY_VALUES: Record<ArmorWeightId, Record<EquipmentQualityId, number>> = {
  "no-weight": { normal: 0, fine: 0, superior: 0, epic: 0, legendary: 0 },
  light: { normal: 158.5, fine: 164.5, superior: 164.5, epic: 168.5, legendary: 174.5 },
  medium: { normal: 236.5, fine: 245.5, superior: 245.5, epic: 251.5, legendary: 260.5 },
  heavy: { normal: 314.5, fine: 326.5, superior: 326.5, epic: 334.5, legendary: 346.5 },
  shield: { normal: 1560, fine: 1620, superior: 1620, epic: 1660, legendary: 1720 },
}

function getArmorValue(
  type: ArmorTypeId,
  weight: ArmorWeightId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  let baseValue: number
  if (
    level !== undefined &&
    (weight === "light" || weight === "medium" || weight === "heavy" || weight === "shield")
  ) {
    baseValue = getArmorBaseValueForLevel(level, weight, quality)
  } else {
    baseValue = BASE_ARMOR_QUALITY_VALUES[weight][quality]
  }

  const multiplier = getArmorMultiplier(type)

  return Math.floor(baseValue * multiplier)
}

export function getArmorEffects(armor: ArmorItem): readonly MetricEffect[] {
  if (armor.weight === "no-weight") {
    return []
  }

  const quality = resolveQuality(armor.quality)

  const armorValue = getArmorValue(armor.type, armor.weight, quality, armor.level)

  let totalArmorValue = armorValue

  switch (armor.trait) {
    case "reinforced":
      totalArmorValue = calculateReinforcedValue(armorValue, quality)
      break
    case "nirnhoned":
      totalArmorValue = calculateNirnhonedValue(armorValue, quality)
      break
    case "no-trait":
    case "divines":
    case "impenetrable":
    case "infused":
    case "invigorating":
    case "sturdy":
    case "training":
    case "well-fitted":
    case "ornate":
    case "intricate":
      break
    default:
      assertNever(armor.trait)
  }

  return [
    {
      metricId: "resistance" as const,
      effectType: "integer" as const,
      effectValue: totalArmorValue,
    },
  ]
}
