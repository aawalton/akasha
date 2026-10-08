import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitVigorousFine = {
  id: "01a0d3e8-e98c-71ce-a8dd-0b71094f637c",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-vigorous-fine",
  title: "Vigorous at Fine",
  thing: "temper-companion-trait/vigorous",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-health-maximum",
  value: 0.018,
  createdAt: "2026-09-24T14:54:11.852Z",
  updatedAt: "2026-09-24T14:55:22.000Z",
} as const satisfies TemperCompanionTraitGrade
