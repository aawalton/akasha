import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitQuickenedEpic = {
  id: "01a0d3e8-3172-7d76-8c9f-21c59f6f4b34",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-quickened-epic",
  title: "Quickened at Epic",
  thing: "temper-companion-trait/quickened",
  quality: "temper-quality/epic",
  metric: "temper-companion-passive-metric/companion-ability-cooldown",
  value: 0.026,
} as const satisfies TemperCompanionTraitGrade
