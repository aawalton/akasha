import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDiseaseResistLegendary = {
  id: "01a0d3e8-1d34-7e64-9f84-c8f458260087",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-disease-resist-legendary",
  title: "Disease Resist at Legendary",
  thing: "temper-jewelry-enchant/disease-resist",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
