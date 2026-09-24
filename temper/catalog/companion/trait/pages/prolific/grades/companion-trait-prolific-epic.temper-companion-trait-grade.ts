import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitProlificEpic = {
  id: "01a0d3e7-fe50-739a-a9c5-c27da818b1e8",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-prolific-epic",
  title: "Prolific at Epic",
  thing: "temper-companion-trait/prolific",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-ultimate-generation",
  value: 0.13,
} as const satisfies TemperCompanionTraitGrade
