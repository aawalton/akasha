import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAggressiveFine = {
  id: "01a0d3e7-377d-7b52-809b-bec8da8d7bc7",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-aggressive-fine",
  title: "Aggressive at Fine",
  thing: "temper-companion-trait/aggressive",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-damage-done",
  value: 0.0085,
} as const satisfies TemperCompanionTraitGrade
