import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAugmentedLegendary = {
  id: "01a0d3e7-901f-716e-ab3b-7069a057ed94",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-augmented-legendary",
  title: "Augmented at Legendary",
  thing: "temper-companion-trait/augmented",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-buff-duration",
  value: 0.03,
} as const satisfies TemperCompanionTraitGrade
