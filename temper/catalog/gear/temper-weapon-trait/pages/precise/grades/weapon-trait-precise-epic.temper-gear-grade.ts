import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPreciseEpic = {
  id: "01a0d3e9-991c-7315-97a9-e9253a96b23b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-precise-epic",
  title: "Precise at Epic",
  thing: "temper-weapon-trait/precise",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-critical-rating",
  value: 679,
} as const satisfies TemperGearGrade
