import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitSoothingEpic = {
  id: "01a0d3e8-aceb-79f3-9f55-1510994a3df8",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-soothing-epic",
  title: "Soothing at Epic",
  thing: "temper-companion-trait/soothing",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-healing-done",
  value: 0.017,
} as const satisfies TemperCompanionTraitGrade
