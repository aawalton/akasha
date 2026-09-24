import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDiseaseResistSuperior = {
  id: "01a0d3e8-09a1-76b5-bbd2-9075926dcf44",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-disease-resist-superior",
  title: "Disease Resist at Superior",
  thing: "temper-jewelry-enchant/disease-resist",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
