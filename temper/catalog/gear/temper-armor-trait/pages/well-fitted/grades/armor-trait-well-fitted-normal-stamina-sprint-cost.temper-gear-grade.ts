import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedNormalStaminaSprintCost = {
  id: "01a0d3ea-900c-7b34-bfd0-c5875823ec77",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-normal-stamina-sprint-cost",
  title: "Well-Fitted at Normal on Stamina Sprint Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-sprint-cost",
  value: 0.012,
  createdAt: "2026-09-24T14:56:00.012Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
