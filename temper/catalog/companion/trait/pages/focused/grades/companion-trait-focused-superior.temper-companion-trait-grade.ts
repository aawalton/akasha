import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitFocusedSuperior = {
  id: "01a0d3e7-e524-7ee9-a365-87b2d0947126",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-focused-superior",
  title: "Focused at Superior",
  thing: "temper-companion-trait/focused",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-critical-chance",
  value: 481,
} as const satisfies TemperCompanionTraitGrade
