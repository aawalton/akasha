import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPreciseNormal = {
  id: "01a0d3e9-a8c1-79ed-a03b-e71e33e1706e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-precise-normal",
  title: "Precise at Normal",
  thing: "temper-weapon-trait/precise",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-critical-rating",
  value: 350,
} as const satisfies TemperGearGrade
