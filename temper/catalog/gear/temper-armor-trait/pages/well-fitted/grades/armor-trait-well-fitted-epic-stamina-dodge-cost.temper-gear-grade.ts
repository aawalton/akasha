import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedEpicStaminaDodgeCost = {
  id: "01a0d3ea-69c2-7df0-969d-24f8e1b90373",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-epic-stamina-dodge-cost",
  title: "Well-Fitted at Epic on Stamina Dodge Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-dodge-cost",
  value: 0.048,
} as const satisfies TemperGearGrade
