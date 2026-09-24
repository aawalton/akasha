import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitShatteringEpic = {
  id: "01a0d3e8-5c95-779a-b784-1ab9b818fc69",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-shattering-epic",
  title: "Shattering at Epic",
  thing: "temper-companion-trait/shattering",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-penetration",
  value: 1300,
} as const satisfies TemperCompanionTraitGrade
