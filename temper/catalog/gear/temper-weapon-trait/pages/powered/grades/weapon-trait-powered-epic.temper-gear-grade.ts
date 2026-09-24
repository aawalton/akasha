import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPoweredEpic = {
  id: "01a0d3e9-67f9-7f7c-bff7-a70d877153b9",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-powered-epic",
  title: "Powered at Epic",
  thing: "temper-weapon-trait/powered",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-healing-done-base",
  value: 0.04,
} as const satisfies TemperGearGrade
