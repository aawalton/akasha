import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitFocusedFine = {
  id: "01a0d3e7-d49d-7d1e-8610-11e49feb2c9e",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-focused-fine",
  title: "Focused at Fine",
  thing: "temper-companion-trait/focused",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-critical-chance",
  value: 394,
} as const satisfies TemperCompanionTraitGrade
