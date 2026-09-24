import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmFinePowerWeapon = {
  id: "01a0d3e9-6393-74e8-a6cd-6cc50ffda4d1",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-fine-power-weapon",
  title: "Increase Magical Harm at Fine on Power Weapon",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 141,
} as const satisfies TemperGearGrade
