import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitBolsteredNormal = {
  id: "01a0d3e7-a98d-7be8-b67a-8e286d515636",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-bolstered-normal",
  title: "Bolstered at Normal",
  thing: "temper-companion-trait/bolstered",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-damage-taken",
  value: 0.00925,
} as const satisfies TemperCompanionTraitGrade
