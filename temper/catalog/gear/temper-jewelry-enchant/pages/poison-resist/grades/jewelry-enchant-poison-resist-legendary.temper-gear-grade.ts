import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPoisonResistLegendary = {
  id: "01a0d3ea-a41f-72e6-97e7-f527f9d9f39d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-poison-resist-legendary",
  title: "Poison Resist at Legendary",
  thing: "temper-jewelry-enchant/poison-resist",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
