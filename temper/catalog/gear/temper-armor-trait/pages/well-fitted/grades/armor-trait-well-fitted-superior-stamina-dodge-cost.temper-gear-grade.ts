import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedSuperiorStaminaDodgeCost = {
  id: "01a0d3ea-ad23-78f5-b33d-ff87e96441cf",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-superior-stamina-dodge-cost",
  title: "Well-Fitted at Superior on Stamina Dodge Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-dodge-cost",
  value: 0.036,
} as const satisfies TemperGearGrade
