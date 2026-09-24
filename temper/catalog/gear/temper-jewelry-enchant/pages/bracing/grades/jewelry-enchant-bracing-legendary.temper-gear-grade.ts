import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBracingLegendary = {
  id: "01a0d3e7-784e-795a-b7f8-66aa82ab4b13",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bracing-legendary",
  title: "Bracing at Legendary",
  thing: "temper-jewelry-enchant/bracing",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-block-cost",
  value: -203,
} as const satisfies TemperGearGrade
