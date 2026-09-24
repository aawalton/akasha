import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitBolsteredSuperior = {
  id: "01a0d3e7-bcc8-7f14-8dce-a0af857c8d52",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-bolstered-superior",
  title: "Bolstered at Superior",
  thing: "temper-companion-trait/bolstered",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-damage-taken",
  value: 0.01475,
} as const satisfies TemperCompanionTraitGrade
