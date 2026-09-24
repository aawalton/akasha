import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmNormalPowerSpell = {
  id: "01a0d3e9-7fa9-7876-96bd-e1b7a912eb61",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-normal-power-spell",
  title: "Increase Magical Harm at Normal on Power Spell",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-spell",
  value: 134,
} as const satisfies TemperGearGrade
