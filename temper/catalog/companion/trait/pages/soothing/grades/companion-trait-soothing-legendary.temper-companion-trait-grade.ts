import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitSoothingLegendary = {
  id: "01a0d3e8-d7e5-70a6-8a77-02c15e04ee97",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-soothing-legendary",
  title: "Soothing at Legendary",
  thing: "temper-companion-trait/soothing",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-healing-done",
  value: 0.021,
} as const satisfies TemperCompanionTraitGrade
