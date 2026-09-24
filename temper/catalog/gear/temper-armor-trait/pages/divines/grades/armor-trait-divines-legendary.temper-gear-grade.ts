import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitDivinesLegendary = {
  id: "01a0d3e8-90dc-7ebc-8883-b22f1631d148",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-divines-legendary",
  title: "Divines at Legendary",
  thing: "temper-armor-trait/divines",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-divines",
  value: 0.091,
} as const satisfies TemperGearGrade
