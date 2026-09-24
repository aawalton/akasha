import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitTrainingEpic = {
  id: "01a0d3ea-2e0d-7119-bd80-0daa34f8db92",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-training-epic",
  title: "Training at Epic",
  thing: "temper-armor-trait/training",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-training",
  value: 0.1,
} as const satisfies TemperGearGrade
