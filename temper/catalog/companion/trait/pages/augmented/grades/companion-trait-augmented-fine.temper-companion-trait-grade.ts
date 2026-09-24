import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAugmentedFine = {
  id: "01a0d3e7-6c5e-795a-be98-a3cf3d0eca94",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-augmented-fine",
  title: "Augmented at Fine",
  thing: "temper-companion-trait/augmented",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-buff-duration",
  value: 0.018,
} as const satisfies TemperCompanionTraitGrade
