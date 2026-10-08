import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitChargedSuperior = {
  id: "01a0d3e8-401b-7bac-aecb-144fb1ad8661",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-charged-superior",
  title: "Charged at Superior",
  thing: "temper-weapon-trait/charged",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-status-effect-chance",
  value: 1.075,
  createdAt: "2026-09-24T14:53:28.475Z",
  updatedAt: "2026-09-24T14:53:49.000Z",
} as const satisfies TemperGearGrade
