import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitChargedFine = {
  id: "01a0d3e8-2fbb-76ca-a3d1-a0443d2ab110",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-charged-fine",
  title: "Charged at Fine",
  thing: "temper-weapon-trait/charged",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-status-effect-chance",
  value: 1.025,
} as const satisfies TemperGearGrade
