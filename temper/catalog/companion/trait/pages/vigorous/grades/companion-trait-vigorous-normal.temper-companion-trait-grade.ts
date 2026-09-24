import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitVigorousNormal = {
  id: "01a0d3e8-f194-7083-8cbb-6da7d47363a1",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-vigorous-normal",
  title: "Vigorous at Normal",
  thing: "temper-companion-trait/vigorous",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-health-maximum",
  value: 0.014,
} as const satisfies TemperCompanionTraitGrade
