import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitProlificSuperior = {
  id: "01a0d3e8-1839-7076-8908-b8f7b98f1e43",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-prolific-superior",
  title: "Prolific at Superior",
  thing: "temper-companion-trait/prolific",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-ultimate-generation",
  value: 0.11,
} as const satisfies TemperCompanionTraitGrade
