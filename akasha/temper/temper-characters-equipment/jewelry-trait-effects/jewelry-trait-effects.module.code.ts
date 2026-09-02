import {
  JEWELRY_TRAIT_QUALITY_VALUES,
  jewelryTraits,
} from "@akasha/temper-equipment/jewelry-traits"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { JewelryItem } from "../item-composites/item-composites.module.code.ts"

function calculateBloodthirstyValue(maxValue: number, targetHealth: number): number {
  const clampedHealth = Math.max(0, Math.min(1, targetHealth))

  if (clampedHealth >= 0.9) {
    return 0
  }

  const scalingFactor = (0.9 - clampedHealth) / 0.9
  return Math.floor(maxValue * scalingFactor)
}

function calculateBloodthirstyEffects(
  targetHealth: number = 1,
  quality: EquipmentQualityId = "legendary"
): readonly MetricEffect[] {
  const maxPower = JEWELRY_TRAIT_QUALITY_VALUES.bloodthirsty[quality]

  return [
    {
      metricId: "power-weapon" as const,
      effectType: "integer" as const,
      effectValue: calculateBloodthirstyValue(maxPower, targetHealth),
    },
    {
      metricId: "power-spell" as const,
      effectType: "integer" as const,
      effectValue: calculateBloodthirstyValue(maxPower, targetHealth),
    },
  ]
}

export function getJewelryTraitEffects(
  jewelry: JewelryItem,
  targetHealth: number = 1
): readonly MetricEffect[] {
  if (jewelry.trait === "no-trait") {
    return []
  }

  const quality = resolveQuality(jewelry.quality)
  const traitConfig = jewelryTraits.data[jewelry.trait]
  if (!traitConfig) return []

  switch (jewelry.trait) {
    case "arcane":
      return [
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES.arcane[quality],
        },
      ]

    case "bloodthirsty":
      return calculateBloodthirstyEffects(targetHealth, quality)

    case "healthy":
      return [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES.healthy[quality],
        },
      ]

    case "protective":
      return [
        {
          metricId: "resistance" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES.protective[quality],
        },
      ]

    case "robust":
      return [
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES.robust[quality],
        },
      ]

    case "swift":
      return [
        {
          metricId: "movement-speed" as const,
          effectType: "fractional-change" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES.swift[quality],
        },
      ]

    case "triune":
      return [
        {
          metricId: "health-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES["triune-health"][quality],
        },
        {
          metricId: "magicka-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES["triune-resource"][quality],
        },
        {
          metricId: "stamina-maximum" as const,
          effectType: "integer" as const,
          effectValue: JEWELRY_TRAIT_QUALITY_VALUES["triune-resource"][quality],
        },
      ]

    case "harmony":
    case "infused":
    case "ornate":
    case "intricate":
      return traitConfig.effects

    default:
      return assertNever(jewelry.trait)
  }
}
