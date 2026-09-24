import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmNormalPowerWeapon = {
  id: "01a0d3e9-770f-7677-8596-de5c8e1cfa90",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-normal-power-weapon",
  title: "Increase Magical Harm at Normal on Power Weapon",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 134,
} as const satisfies TemperGearGrade
