import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDiseaseResistNormal = {
  id: "01a0d3e8-014d-76e8-8fea-e1db19e5227a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-disease-resist-normal",
  title: "Disease Resist at Normal",
  thing: "temper-jewelry-enchant/disease-resist",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
