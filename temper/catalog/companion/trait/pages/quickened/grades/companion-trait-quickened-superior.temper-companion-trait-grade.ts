import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitQuickenedSuperior = {
  id: "01a0d3e8-4b7f-7dd8-90a6-ba5fbd3c7f46",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-quickened-superior",
  title: "Quickened at Superior",
  thing: "temper-companion-trait/quickened",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-ability-cooldown",
  value: 0.022,
  createdAt: "2026-09-24T14:53:31.391Z",
  updatedAt: "2026-09-24T14:53:42.000Z",
} as const satisfies TemperCompanionTraitGrade
