import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitAugmentedNormal = {
  id: "01a0d3e7-7e6e-7456-ae3c-0c1a978cbaec",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-augmented-normal",
  title: "Augmented at Normal",
  thing: "temper-companion-trait/augmented",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-buff-duration",
  value: 0.014,
} as const satisfies TemperCompanionTraitGrade
