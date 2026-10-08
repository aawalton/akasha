import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAugmentedSuperior = {
  id: "01a0d3e7-8732-79d7-821e-13e0f2659612",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-augmented-superior",
  title: "Augmented at Superior",
  thing: "temper-companion-trait/augmented",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-buff-duration",
  value: 0.022,
  createdAt: "2026-09-24T14:52:41.138Z",
  updatedAt: "2026-09-24T14:53:42.000Z",
} as const satisfies TemperCompanionTraitGrade
