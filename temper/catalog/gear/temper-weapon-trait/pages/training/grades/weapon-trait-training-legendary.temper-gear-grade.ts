import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitTrainingLegendary = {
  id: "01a0d3ea-6ae9-79c1-86d5-9b225a7148d0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-training-legendary",
  title: "Training at Legendary",
  thing: "temper-weapon-trait/training",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-training",
  value: 0.045,
} as const satisfies TemperGearGrade
