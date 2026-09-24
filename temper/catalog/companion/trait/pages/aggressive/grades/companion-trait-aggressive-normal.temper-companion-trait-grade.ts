import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAggressiveNormal = {
  id: "01a0d3e7-4bd1-7153-90b1-5118d5e9c3be",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-aggressive-normal",
  title: "Aggressive at Normal",
  thing: "temper-companion-trait/aggressive",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-damage-done",
  value: 0.00425,
} as const satisfies TemperCompanionTraitGrade
