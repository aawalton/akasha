import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAggressiveLegendary = {
  id: "01a0d3e7-5b3a-79b8-8945-b5f3bb052b1b",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-aggressive-legendary",
  title: "Aggressive at Legendary",
  thing: "temper-companion-trait/aggressive",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-damage-done",
  value: 0.02125,
} as const satisfies TemperCompanionTraitGrade
