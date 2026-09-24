import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitDivinesEpic = {
  id: "01a0d3e8-7159-79ef-9d0e-777cc9ed3914",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-divines-epic",
  title: "Divines at Epic",
  thing: "temper-armor-trait/divines",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-divines",
  value: 0.0806,
} as const satisfies TemperGearGrade
