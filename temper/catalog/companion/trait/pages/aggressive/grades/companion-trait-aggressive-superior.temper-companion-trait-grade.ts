import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAggressiveSuperior = {
  id: "01a0d3e7-5265-7561-a5ce-8b6b9225d02a",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-aggressive-superior",
  title: "Aggressive at Superior",
  thing: "temper-companion-trait/aggressive",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-damage-done",
  value: 0.01275,
} as const satisfies TemperCompanionTraitGrade
