import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedSuperiorStaminaSprintCost = {
  id: "01a0d3ea-a398-77cc-8efb-aa8f472d3a2a",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-superior-stamina-sprint-cost",
  title: "Well-Fitted at Superior on Stamina Sprint Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-sprint-cost",
  value: 0.036,
} as const satisfies TemperGearGrade
