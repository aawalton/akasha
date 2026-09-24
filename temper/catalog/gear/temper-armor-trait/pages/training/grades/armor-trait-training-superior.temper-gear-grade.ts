import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitTrainingSuperior = {
  id: "01a0d3ea-4eaf-7f55-9225-87dac99394f6",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-training-superior",
  title: "Training at Superior",
  thing: "temper-armor-trait/training",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-training",
  value: 0.09,
} as const satisfies TemperGearGrade
