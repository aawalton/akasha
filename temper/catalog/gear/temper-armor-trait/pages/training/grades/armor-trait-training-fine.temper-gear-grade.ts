import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitTrainingFine = {
  id: "01a0d3ea-3f6c-7231-968d-596370fc7b0e",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-training-fine",
  title: "Training at Fine",
  thing: "temper-armor-trait/training",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-training",
  value: 0.08,
  createdAt: "2026-09-24T14:55:39.372Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
