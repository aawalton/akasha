import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitQuickenedLegendary = {
  id: "01a0d3e8-54c3-7da0-a930-4cb65a71ef3d",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-quickened-legendary",
  title: "Quickened at Legendary",
  thing: "temper-companion-trait/quickened",
  quality: "temper-quality/legendary",
  metric: "temper-companion-passive-metric/companion-ability-cooldown",
  value: 0.03,
} as const satisfies TemperCompanionTraitGrade
