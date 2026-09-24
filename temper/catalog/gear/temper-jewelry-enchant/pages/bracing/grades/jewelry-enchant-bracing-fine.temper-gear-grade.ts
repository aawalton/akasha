import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBracingFine = {
  id: "01a0d3e7-5fc1-75f7-9e5b-655bb5901f0e",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bracing-fine",
  title: "Bracing at Fine",
  thing: "temper-jewelry-enchant/bracing",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-block-cost",
  value: -167,
} as const satisfies TemperGearGrade
