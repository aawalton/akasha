import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitShatteringNormal = {
  id: "01a0d3e8-93d2-769c-b7ad-3971b737bd63",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-shattering-normal",
  title: "Shattering at Normal",
  thing: "temper-companion-trait/shattering",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-penetration",
  value: 700,
} as const satisfies TemperCompanionTraitGrade
