import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitVigorousSuperior = {
  id: "01a0d3e9-06ea-74fd-bab2-6a0355f5992c",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-vigorous-superior",
  title: "Vigorous at Superior",
  thing: "temper-companion-trait/vigorous",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-health-maximum",
  value: 0.022,
  createdAt: "2026-09-24T14:54:19.370Z",
  updatedAt: "2026-09-24T14:55:22.000Z",
} as const satisfies TemperCompanionTraitGrade
