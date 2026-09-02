import { WEAPON_TRAIT_QUALITY_VALUES, weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import {
  type EquipmentQualityId,
  resolveQuality,
} from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { MetricEffect } from "@akasha/temper-formula-framework/effect"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { WeaponItem } from "../item-composites/item-composites.module.code.ts"
import { weaponTypes } from "../weapon-types-data/weapon-types-data.module.code.ts"

function rawTraitQualityValues(
  normal: number,
  legendary: number
): Record<EquipmentQualityId, number> {
  const range = legendary - normal
  return {
    normal,
    fine: normal + (3 / 11) * range,
    superior: normal + (6 / 11) * range,
    epic: normal + (8 / 11) * range,
    legendary,
  }
}

const DEFENDING_RAW_VALUES = rawTraitQualityValues(
  WEAPON_TRAIT_QUALITY_VALUES.defending.normal,
  WEAPON_TRAIT_QUALITY_VALUES.defending.legendary
)
const SHARPENED_RAW_VALUES = rawTraitQualityValues(
  WEAPON_TRAIT_QUALITY_VALUES.sharpened.normal,
  WEAPON_TRAIT_QUALITY_VALUES.sharpened.legendary
)

function calculateDecisiveEffects(weapon: WeaponItem): readonly MetricEffect[] {
  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const quality = resolveQuality(weapon.quality)

  const baseChance = WEAPON_TRAIT_QUALITY_VALUES.decisive[quality]
  const chanceValue = is2H ? baseChance * 2 : baseChance

  return [
    {
      metricId: "ultimate-generation" as const,
      effectType: "conditional-chance" as const,
      effectValue: {
        chance: chanceValue,
        trigger: "on-ultimate-gain",
        value: 1,
      },
    },
  ]
}

export function getWeaponTraitEffects(weapon: WeaponItem): readonly MetricEffect[] {
  if (weapon.type === "no-type") return []

  const traitConfig = weaponTraits.data[weapon.trait]
  if (!traitConfig) return []

  const is2H = weaponTypes.data[weapon.type].isTwoHanded
  const quality = resolveQuality(weapon.quality)

  if (traitConfig.id === "decisive") {
    return calculateDecisiveEffects(weapon)
  }

  if (traitConfig.id === "infused" || traitConfig.id === "nirnhoned") {
    return []
  }

  switch (weapon.trait) {
    case "charged": {
      const baseValue = WEAPON_TRAIT_QUALITY_VALUES.charged[quality]
      return [
        {
          metricId: "status-effect-chance" as const,
          effectType: "fractional-change" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "defending": {
      const rawValue = DEFENDING_RAW_VALUES[quality]
      const value = Math.floor(is2H ? rawValue * 2 : rawValue)
      return [
        {
          metricId: "resistance-physical" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "resistance-spell" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
    }

    case "powered": {
      const baseValue = WEAPON_TRAIT_QUALITY_VALUES.powered[quality]
      return [
        {
          metricId: "healing-done-base" as const,
          effectType: "fractional-change" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "precise": {
      const baseValue = WEAPON_TRAIT_QUALITY_VALUES.precise[quality]
      return [
        {
          metricId: "critical-rating" as const,
          effectType: "integer" as const,
          effectValue: is2H ? baseValue * 2 : baseValue,
        },
      ]
    }

    case "sharpened": {
      const rawValue = SHARPENED_RAW_VALUES[quality]
      const value = Math.floor(is2H ? rawValue * 2 : rawValue)
      return [
        {
          metricId: "penetration-physical" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
        {
          metricId: "penetration-spell" as const,
          effectType: "integer" as const,
          effectValue: value,
        },
      ]
    }

    case "training": {
      const baseValue = WEAPON_TRAIT_QUALITY_VALUES.training[quality]
      return [
        {
          metricId: "experience-gain" as const,
          effectType: "fractional-change" as const,
          effectValue: baseValue,
        },
      ]
    }

    case "no-trait":
    case "infused":
    case "nirnhoned":
    case "ornate":
    case "intricate":
    case "decisive":
      return traitConfig.effects

    default:
      return assertNever(weapon.trait)
  }
}
