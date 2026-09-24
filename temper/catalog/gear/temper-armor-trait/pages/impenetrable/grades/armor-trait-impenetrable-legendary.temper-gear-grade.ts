import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitImpenetrableLegendary = {
  id: "01a0d3e8-c41c-7bbe-a2b3-8dcba0700a7c",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-impenetrable-legendary",
  title: "Impenetrable at Legendary",
  thing: "temper-armor-trait/impenetrable",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance-critical",
  value: 127,
} as const satisfies TemperGearGrade
