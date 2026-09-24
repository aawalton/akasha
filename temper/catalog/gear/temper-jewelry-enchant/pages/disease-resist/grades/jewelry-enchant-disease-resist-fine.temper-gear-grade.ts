import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDiseaseResistFine = {
  id: "01a0d3e7-f8d2-7107-afee-ed671a47bae4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-disease-resist-fine",
  title: "Disease Resist at Fine",
  thing: "temper-jewelry-enchant/disease-resist",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
