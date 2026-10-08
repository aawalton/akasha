import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitQuickenedNormal = {
  id: "01a0d3e8-431a-7360-afc5-5c87a9d79e4b",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-quickened-normal",
  title: "Quickened at Normal",
  thing: "temper-companion-trait/quickened",
  quality: "temper-quality/normal",
  metric: "temper-companion-passive-metric/companion-ability-cooldown",
  value: 0.014,
  createdAt: "2026-09-24T14:53:29.242Z",
  updatedAt: "2026-09-24T14:53:42.000Z",
} as const satisfies TemperCompanionTraitGrade
