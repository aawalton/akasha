import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitWellFittedFineStaminaDodgeCost = {
  id: "01a0d3ea-8778-72d0-9e57-c541edf25d5b",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-well-fitted-fine-stamina-dodge-cost",
  title: "Well-Fitted at Fine on Stamina Dodge Cost",
  thing: "temper-armor-trait/well-fitted",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-dodge-cost",
  value: 0.024,
  createdAt: "2026-09-24T14:55:57.816Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
