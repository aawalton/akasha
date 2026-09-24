import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitSturdySuperior = {
  id: "01a0d3ea-1e8e-7c76-bf87-4045df4204a6",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-sturdy-superior",
  title: "Sturdy at Superior",
  thing: "temper-armor-trait/sturdy",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-sturdy",
  value: 0.03,
} as const satisfies TemperGearGrade
