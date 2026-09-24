import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitPoweredFine = {
  id: "01a0d3e9-6f00-7fbf-931d-30c53950ce41",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-powered-fine",
  title: "Powered at Fine",
  thing: "temper-weapon-trait/powered",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-healing-done-base",
  value: 0.03,
} as const satisfies TemperGearGrade
