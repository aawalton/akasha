import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitSturdyFine = {
  id: "01a0d3ea-0d5c-737f-84cc-20893b5e2c48",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-sturdy-fine",
  title: "Sturdy at Fine",
  thing: "temper-armor-trait/sturdy",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-sturdy",
  value: 0.025,
} as const satisfies TemperGearGrade
