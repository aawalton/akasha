import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableFine = {
  id: "01a0d3e8-a1a1-7169-ae69-331b8f7957d9",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-fine",
  title: "Impenetrable at Fine",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 118,
} as const satisfies TemperGearGrade
