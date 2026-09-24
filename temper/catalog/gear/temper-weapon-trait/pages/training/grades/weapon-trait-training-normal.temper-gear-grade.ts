import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitTrainingNormal = {
  id: "01a0d3ea-5b99-7386-b2a3-138cdf25ee25",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-training-normal",
  title: "Training at Normal",
  thing: "temper-weapon-trait/training",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-training",
  value: 0.025,
} as const satisfies TemperGearGrade
