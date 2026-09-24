import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitDivinesFine = {
  id: "01a0d3e8-7a6d-7dac-aee7-026f2a0a79bc",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-divines-fine",
  title: "Divines at Fine",
  thing: "temper-armor-trait/divines",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-divines",
  value: 0.061,
} as const satisfies TemperGearGrade
