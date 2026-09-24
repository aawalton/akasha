import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedEpicStaminaSprintCost = {
  id: "01a0d3ea-6035-72e0-83e8-c398285b0fc0",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-epic-stamina-sprint-cost",
  title: "Well-Fitted at Epic on Stamina Sprint Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-sprint-cost",
  value: 0.048,
} as const satisfies TemperGearGrade
