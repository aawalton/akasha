import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPoweredNormal = {
  id: "01a0d3e9-7788-7042-a96d-9abb26caa018",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-powered-normal",
  title: "Powered at Normal",
  thing: "temper-weapon-trait/powered",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-healing-done-base",
  value: 0.025,
} as const satisfies TemperGearGrade
