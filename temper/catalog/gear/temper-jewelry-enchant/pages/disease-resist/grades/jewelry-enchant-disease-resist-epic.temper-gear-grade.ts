import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDiseaseResistEpic = {
  id: "01a0d3e7-f06a-7602-a3c1-348ebb7a9102",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-disease-resist-epic",
  title: "Disease Resist at Epic",
  thing: "temper-jewelry-enchant/disease-resist",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
