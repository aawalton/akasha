import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitSoothingNormal = {
  id: "01a0d3e8-c656-79a1-b660-ee4a97f989b1",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-soothing-normal",
  title: "Soothing at Normal",
  thing: "temper-companion-trait/soothing",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-healing-done",
  value: 0.005,
} as const satisfies TemperCompanionTraitGrade
