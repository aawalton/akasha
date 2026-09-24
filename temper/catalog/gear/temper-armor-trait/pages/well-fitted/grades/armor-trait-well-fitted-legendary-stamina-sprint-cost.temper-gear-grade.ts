import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedLegendaryStaminaSprintCost = {
  id: "01a0d3ea-b6c2-7dd8-8f06-3e8b808d10c4",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-legendary-stamina-sprint-cost",
  title: "Well-Fitted at Legendary on Stamina Sprint Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-sprint-cost",
  value: 0.06,
} as const satisfies TemperGearGrade
