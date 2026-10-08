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
  createdAt: "2026-09-24T14:55:43.279Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
