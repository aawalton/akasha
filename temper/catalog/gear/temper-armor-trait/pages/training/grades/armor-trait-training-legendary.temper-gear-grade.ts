import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitTrainingLegendary = {
  id: "01a0d3ea-5776-76cd-8efb-08261dd53368",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-training-legendary",
  title: "Training at Legendary",
  thing: "temper-armor-trait/training",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-training",
  value: 0.11,
} as const satisfies TemperGearGrade
