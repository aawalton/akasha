import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitBolsteredLegendary = {
  id: "01a0d3e7-c58a-74ca-824c-49774846447b",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-bolstered-legendary",
  title: "Bolstered at Legendary",
  thing: "temper-companion-trait/bolstered",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-damage-taken",
  value: 0.02025,
} as const satisfies TemperCompanionTraitGrade
