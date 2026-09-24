import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableNormal = {
  id: "01a0d3e8-b2e9-7ef5-bc7f-4f5ed9b3ea46",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-normal",
  title: "Impenetrable at Normal",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 116,
} as const satisfies TemperGearGrade
