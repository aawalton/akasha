import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPreciseSuperior = {
  id: "01a0d3e9-b10e-7eae-aab6-11e7d78c3240",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-precise-superior",
  title: "Precise at Superior",
  thing: "temper-weapon-trait/precise",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-critical-rating",
  value: 569,
} as const satisfies TemperGearGrade
