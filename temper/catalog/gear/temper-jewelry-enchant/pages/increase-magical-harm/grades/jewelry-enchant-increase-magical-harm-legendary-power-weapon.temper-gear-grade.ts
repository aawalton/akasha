import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmLegendaryPowerWeapon = {
  id: "01a0d3e9-a84d-718a-81e6-c7593c804969",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-legendary-power-weapon",
  title: "Increase Magical Harm at Legendary on Power Weapon",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 174,
} as const satisfies TemperGearGrade
