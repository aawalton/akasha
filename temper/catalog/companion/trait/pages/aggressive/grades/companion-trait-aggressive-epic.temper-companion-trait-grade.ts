import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAggressiveEpic = {
  id: "01a0d3e4-0f7e-75d5-8f17-90ac6a15bc52",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-aggressive-epic",
  title: "Aggressive at Epic",
  thing: "temper-companion-trait/aggressive",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-damage-done",
  value: 0.017,
} as const satisfies TemperCompanionTraitGrade
