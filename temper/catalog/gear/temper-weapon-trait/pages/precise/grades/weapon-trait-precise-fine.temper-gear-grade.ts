import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPreciseFine = {
  id: "01a0d3e9-a1da-7507-8191-5844d37100bf",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-precise-fine",
  title: "Precise at Fine",
  thing: "temper-weapon-trait/precise",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-critical-rating",
  value: 460,
} as const satisfies TemperGearGrade
