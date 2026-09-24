import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitBolsteredEpic = {
  id: "01a0d3e7-9903-7922-9df4-7027bbd686a4",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-bolstered-epic",
  title: "Bolstered at Epic",
  thing: "temper-companion-trait/bolstered",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-damage-taken",
  value: 0.0175,
} as const satisfies TemperCompanionTraitGrade
