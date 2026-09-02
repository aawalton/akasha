import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { ItemLevel } from "../item-composites/item-composites.module.code.ts"

function itemLevelToArmorEffectiveLevel(level: ItemLevel | undefined): number {
  if (level === undefined) {
    return 73
  }

  if (typeof level === "number") {
    return Math.max(1, Math.min(50, level))
  }

  const cpValue = parseInt(level.slice(2), 10)
  return 50 + Math.floor((cpValue * 23) / 160)
}

function itemLevelToWeaponEffectiveLevel(level: ItemLevel | undefined): number {
  return itemLevelToArmorEffectiveLevel(level)
}

const ARMOR_LEVEL_FORMULAS = {
  light: { slope: 2.0, intercept: 28.5 },
  medium: { slope: 3.0, intercept: 41.5 },
  heavy: { slope: 4.0, intercept: 54.5 },
  shield: { slope: 20.0, intercept: 260.0 },
} as const

type ArmorWeightForFormula = keyof typeof ARMOR_LEVEL_FORMULAS

const ARMOR_QUALITY_RATIOS: Record<EquipmentQualityId, number> = {
  normal: 0.9083,
  fine: 0.9427,
  superior: 0.9427,
  epic: 0.9656,
  legendary: 1.0,
}

const SHIELD_QUALITY_RATIOS: Record<EquipmentQualityId, number> = {
  normal: 1560 / 1720,
  fine: 1620 / 1720,
  superior: 1620 / 1720,
  epic: 1660 / 1720,
  legendary: 1.0,
}

export function getArmorBaseValueForLevel(
  level: ItemLevel | undefined,
  weight: ArmorWeightForFormula,
  quality: EquipmentQualityId = "legendary"
): number {
  const effectiveLevel = itemLevelToArmorEffectiveLevel(level)
  const formula = ARMOR_LEVEL_FORMULAS[weight]

  const legendaryBase = formula.slope * effectiveLevel + formula.intercept

  const qualityRatios = weight === "shield" ? SHIELD_QUALITY_RATIOS : ARMOR_QUALITY_RATIOS
  return legendaryBase * qualityRatios[quality]
}

const WEAPON_LEVEL_FORMULAS = {
  standard: { slope: 14.0, intercept: 313.0 },
  twoHandedMelee: { slope: 16.5, intercept: 366.5 },
} as const

const WEAPON_QUALITY_RATIOS: Record<EquipmentQualityId, number> = {
  normal: 1072 / 1335,
  fine: 1108 / 1335,
  superior: 1108 / 1335,
  epic: 1132 / 1335,
  legendary: 1.0,
}

export function getWeaponPowerForLevel(
  level: ItemLevel | undefined,
  isTwoHandedMelee: boolean,
  quality: EquipmentQualityId = "legendary"
): number {
  const effectiveLevel = itemLevelToWeaponEffectiveLevel(level)
  const formula = isTwoHandedMelee
    ? WEAPON_LEVEL_FORMULAS.twoHandedMelee
    : WEAPON_LEVEL_FORMULAS.standard

  const legendaryPower = formula.slope * effectiveLevel + formula.intercept

  const finalPower = legendaryPower * WEAPON_QUALITY_RATIOS[quality]

  return Math.floor(finalPower)
}
