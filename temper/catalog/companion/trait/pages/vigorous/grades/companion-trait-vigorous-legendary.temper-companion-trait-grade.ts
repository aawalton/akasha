import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitVigorousLegendary = {
  id: "01a0d3e9-0fae-7d4f-8f48-de007af75d9d",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-vigorous-legendary",
  title: "Vigorous at Legendary",
  thing: "temper-companion-trait/vigorous",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-health-maximum",
  value: 0.03,
} as const satisfies TemperCompanionTraitGrade
