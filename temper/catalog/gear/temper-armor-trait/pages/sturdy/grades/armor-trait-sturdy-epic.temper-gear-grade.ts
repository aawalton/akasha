import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitSturdyEpic = {
  id: "01a0d3ea-04ea-7a85-9c5a-552bad397361",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-sturdy-epic",
  title: "Sturdy at Epic",
  thing: "temper-armor-trait/sturdy",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-sturdy",
  value: 0.035,
} as const satisfies TemperGearGrade
