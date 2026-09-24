import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitVigorousEpic = {
  id: "01a0d3e8-e0cb-7ad6-b6a8-028c5ce08734",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-vigorous-epic",
  title: "Vigorous at Epic",
  thing: "temper-companion-trait/vigorous",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-health-maximum",
  value: 0.026,
} as const satisfies TemperCompanionTraitGrade
