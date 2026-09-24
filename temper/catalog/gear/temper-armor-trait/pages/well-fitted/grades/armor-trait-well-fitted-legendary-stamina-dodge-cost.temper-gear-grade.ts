import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedLegendaryStaminaDodgeCost = {
  id: "01a0d3ea-c066-7d0c-b4dd-ec2d17a77847",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-legendary-stamina-dodge-cost",
  title: "Well-Fitted at Legendary on Stamina Dodge Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-dodge-cost",
  value: 0.06,
} as const satisfies TemperGearGrade
