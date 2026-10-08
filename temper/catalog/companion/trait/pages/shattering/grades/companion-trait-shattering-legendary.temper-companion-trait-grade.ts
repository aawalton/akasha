import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitShatteringLegendary = {
  id: "01a0d3e8-a542-7fc6-803a-8badc0c31d9e",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-shattering-legendary",
  title: "Shattering at Legendary",
  thing: "temper-companion-trait/shattering",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-penetration",
  value: 1500,
  createdAt: "2026-09-24T14:53:54.370Z",
  updatedAt: "2026-09-24T14:55:22.000Z",
} as const satisfies TemperCompanionTraitGrade
