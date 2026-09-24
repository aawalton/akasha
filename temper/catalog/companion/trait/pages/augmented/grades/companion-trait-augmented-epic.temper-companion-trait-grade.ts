import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAugmentedEpic = {
  id: "01a0d3e7-6402-7044-bdd4-c6928bbca084",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-augmented-epic",
  title: "Augmented at Epic",
  thing: "temper-companion-trait/augmented",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-buff-duration",
  value: 0.026,
} as const satisfies TemperCompanionTraitGrade
