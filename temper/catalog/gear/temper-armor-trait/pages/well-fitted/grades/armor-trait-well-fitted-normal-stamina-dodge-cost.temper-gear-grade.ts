import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedNormalStaminaDodgeCost = {
  id: "01a0d3ea-9af7-789b-97b6-dfdfd30780b0",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-normal-stamina-dodge-cost",
  title: "Well-Fitted at Normal on Stamina Dodge Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-dodge-cost",
  value: 0.012,
} as const satisfies TemperGearGrade
