import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitFocusedNormal = {
  id: "01a0d3e7-dd66-7bb7-b82f-2ecfa608d90a",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-focused-normal",
  title: "Focused at Normal",
  thing: "temper-companion-trait/focused",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-critical-chance",
  value: 307,
} as const satisfies TemperCompanionTraitGrade
