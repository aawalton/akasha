import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPoweredLegendary = {
  id: "01a0d3e9-905b-78ad-81fb-4cd30198d788",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-powered-legendary",
  title: "Powered at Legendary",
  thing: "temper-weapon-trait/powered",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-healing-done-base",
  value: 0.045,
} as const satisfies TemperGearGrade
