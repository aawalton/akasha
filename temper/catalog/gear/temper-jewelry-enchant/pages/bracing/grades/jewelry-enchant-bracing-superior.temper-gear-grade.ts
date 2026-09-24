import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBracingSuperior = {
  id: "01a0d3e7-70fe-7103-9e05-7992c5dc5412",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bracing-superior",
  title: "Bracing at Superior",
  thing: "temper-jewelry-enchant/bracing",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-block-cost",
  value: -179,
} as const satisfies TemperGearGrade
