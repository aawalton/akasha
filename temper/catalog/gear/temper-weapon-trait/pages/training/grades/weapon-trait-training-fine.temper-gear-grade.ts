import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitTrainingFine = {
  id: "01a0d3ea-52f5-7100-aa4c-29bf5a44aff0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-training-fine",
  title: "Training at Fine",
  thing: "temper-weapon-trait/training",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-training",
  value: 0.03,
  createdAt: "2026-09-24T14:55:44.373Z",
  updatedAt: "2026-09-24T14:55:57.000Z",
} as const satisfies TemperGearGrade
