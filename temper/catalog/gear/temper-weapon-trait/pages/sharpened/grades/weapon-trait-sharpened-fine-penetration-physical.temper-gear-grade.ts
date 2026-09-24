import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedFinePenetrationPhysical = {
  id: "01a0d3e9-fab1-7bd4-91ff-f21062b704e1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-fine-penetration-physical",
  title: "Sharpened at Fine on Penetration Physical",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1485,
} as const satisfies TemperGearGrade
