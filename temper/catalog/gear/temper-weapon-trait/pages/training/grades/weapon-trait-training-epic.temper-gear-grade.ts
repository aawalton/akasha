import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitTrainingEpic = {
  id: "01a0d3ea-4c27-7f68-8b82-60e9b68c5536",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-training-epic",
  title: "Training at Epic",
  thing: "temper-weapon-trait/training",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-training",
  value: 0.04,
  createdAt: "2026-09-24T14:55:42.631Z",
  updatedAt: "2026-09-24T14:55:57.000Z",
} as const satisfies TemperGearGrade
