import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableEpic = {
  id: "01a0d3e8-9934-79ca-a16a-f1bad53c8db4",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-epic",
  title: "Impenetrable at Epic",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 124,
} as const satisfies TemperGearGrade
