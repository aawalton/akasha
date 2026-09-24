import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitFocusedLegendary = {
  id: "01a0d3e7-f53d-77ed-8343-cf3abc2ca25f",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-focused-legendary",
  title: "Focused at Legendary",
  thing: "temper-companion-trait/focused",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-critical-chance",
  value: 657,
} as const satisfies TemperCompanionTraitGrade
