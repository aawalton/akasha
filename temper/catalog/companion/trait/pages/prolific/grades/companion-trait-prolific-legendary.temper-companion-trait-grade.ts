import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitProlificLegendary = {
  id: "01a0d3e8-20a0-702b-aeb4-0727d08712bf",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-prolific-legendary",
  title: "Prolific at Legendary",
  thing: "temper-companion-trait/prolific",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-ultimate-generation",
  value: 0.15,
} as const satisfies TemperCompanionTraitGrade
