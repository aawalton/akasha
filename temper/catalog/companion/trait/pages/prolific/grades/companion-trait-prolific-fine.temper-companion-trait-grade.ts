import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitProlificFine = {
  id: "01a0d3e8-06a5-7fa1-a07c-012edeca1cab",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-prolific-fine",
  title: "Prolific at Fine",
  thing: "temper-companion-trait/prolific",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-ultimate-generation",
  value: 0.09,
} as const satisfies TemperCompanionTraitGrade
