import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitQuickenedFine = {
  id: "01a0d3e8-3a23-7859-af3a-8fa2818708e2",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-quickened-fine",
  title: "Quickened at Fine",
  thing: "temper-companion-trait/quickened",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-ability-cooldown",
  value: 0.018,
  createdAt: "2026-09-24T14:53:26.947Z",
  updatedAt: "2026-09-24T14:53:42.000Z",
} as const satisfies TemperCompanionTraitGrade
