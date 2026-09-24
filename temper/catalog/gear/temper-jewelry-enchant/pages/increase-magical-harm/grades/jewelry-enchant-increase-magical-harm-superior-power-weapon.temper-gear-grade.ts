import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmSuperiorPowerWeapon = {
  id: "01a0d3e9-89b8-76dc-b1a5-1f6403db55ac",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-superior-power-weapon",
  title: "Increase Magical Harm at Superior on Power Weapon",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 153,
} as const satisfies TemperGearGrade
