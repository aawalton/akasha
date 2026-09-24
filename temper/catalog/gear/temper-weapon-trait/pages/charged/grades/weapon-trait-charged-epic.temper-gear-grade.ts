import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitChargedEpic = {
  id: "01a0d3e8-2856-7ea5-a869-42c01394456a",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-charged-epic",
  title: "Charged at Epic",
  thing: "temper-weapon-trait/charged",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-status-effect-chance",
  value: 1.125,
} as const satisfies TemperGearGrade
