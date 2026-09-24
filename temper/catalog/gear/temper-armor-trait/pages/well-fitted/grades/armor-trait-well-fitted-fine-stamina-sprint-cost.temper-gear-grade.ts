import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedFineStaminaSprintCost = {
  id: "01a0d3ea-733f-793b-8117-25b1c1f3e942",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-fine-stamina-sprint-cost",
  title: "Well-Fitted at Fine on Stamina Sprint Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-sprint-cost",
  value: 0.024,
} as const satisfies TemperGearGrade
