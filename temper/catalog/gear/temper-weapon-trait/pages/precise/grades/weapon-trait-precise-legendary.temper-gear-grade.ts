import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPreciseLegendary = {
  id: "01a0d3e9-b949-7e7b-b1d1-d6fb7e51a09e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-precise-legendary",
  title: "Precise at Legendary",
  thing: "temper-weapon-trait/precise",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-critical-rating",
  value: 789,
} as const satisfies TemperGearGrade
