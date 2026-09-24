import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitSoothingFine = {
  id: "01a0d3e8-b54f-78e6-a57a-860be5ad1b0a",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-soothing-fine",
  title: "Soothing at Fine",
  thing: "temper-companion-trait/soothing",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-healing-done",
  value: 0.009,
} as const satisfies TemperCompanionTraitGrade
