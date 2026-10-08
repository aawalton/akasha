import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitShatteringFine = {
  id: "01a0d3e8-8b0c-7824-8e14-0d0cf4466fc9",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-shattering-fine",
  title: "Shattering at Fine",
  thing: "temper-companion-trait/shattering",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-penetration",
  value: 900,
  createdAt: "2026-09-24T14:53:47.660Z",
  updatedAt: "2026-09-24T14:55:22.000Z",
} as const satisfies TemperCompanionTraitGrade
