import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableSuperior = {
  id: "01a0d3e8-bc08-7d59-be70-17f7d8d16316",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-superior",
  title: "Impenetrable at Superior",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 121,
} as const satisfies TemperGearGrade
