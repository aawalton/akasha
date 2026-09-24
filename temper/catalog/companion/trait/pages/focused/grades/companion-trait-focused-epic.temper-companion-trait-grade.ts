import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitFocusedEpic = {
  id: "01a0d3e7-cc02-7edb-a9ac-ef167e2730b5",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-focused-epic",
  title: "Focused at Epic",
  thing: "temper-companion-trait/focused",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-critical-chance",
  value: 569,
} as const satisfies TemperCompanionTraitGrade
