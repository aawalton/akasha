import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitSoothingSuperior = {
  id: "01a0d3e8-cee8-7a2a-bbf4-685b122a09ba",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-soothing-superior",
  title: "Soothing at Superior",
  thing: "temper-companion-trait/soothing",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-healing-done",
  value: 0.013,
} as const satisfies TemperCompanionTraitGrade
