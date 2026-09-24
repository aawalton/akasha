import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPoweredSuperior = {
  id: "01a0d3e9-7f5e-7ab6-ada5-a4c4fd83500a",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-powered-superior",
  title: "Powered at Superior",
  thing: "temper-weapon-trait/powered",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-healing-done-base",
  value: 0.035,
} as const satisfies TemperGearGrade
