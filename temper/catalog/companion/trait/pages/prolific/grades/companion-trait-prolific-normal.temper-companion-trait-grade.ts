import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitProlificNormal = {
  id: "01a0d3e8-0f69-7696-b165-84d509d28134",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-prolific-normal",
  title: "Prolific at Normal",
  thing: "temper-companion-trait/prolific",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-ultimate-generation",
  value: 0.07,
} as const satisfies TemperCompanionTraitGrade
