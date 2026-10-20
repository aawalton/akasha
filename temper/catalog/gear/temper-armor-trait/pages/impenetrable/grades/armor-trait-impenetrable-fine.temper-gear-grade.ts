import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableFine = {
  id: "01a0d3e8-a1a1-7169-ae69-331b8f7957d9",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-fine",
  title: "Impenetrable at Fine",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 124,
  createdAt: "2026-09-24T14:53:53.441Z",
  updatedAt: "2026-10-20T18:01:54.014Z",
} as const satisfies TemperGearGrade
