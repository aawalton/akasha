import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitTrainingSuperior = {
  id: "01a0d3ea-6327-7e5b-b9e0-22ace851029e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-training-superior",
  title: "Training at Superior",
  thing: "temper-weapon-trait/training",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-training",
  value: 0.035,
} as const satisfies TemperGearGrade
