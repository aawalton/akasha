import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitChargedLegendary = {
  id: "01a0d3e8-517f-7d58-a242-7cba7c431b6b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-charged-legendary",
  title: "Charged at Legendary",
  thing: "temper-weapon-trait/charged",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-status-effect-chance",
  value: 1.175,
} as const satisfies TemperGearGrade
