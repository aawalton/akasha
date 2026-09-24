import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitTrainingNormal = {
  id: "01a0d3ea-4867-7494-900c-987aa28b115c",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-training-normal",
  title: "Training at Normal",
  thing: "temper-armor-trait/training",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-training",
  value: 0.07,
} as const satisfies TemperGearGrade
