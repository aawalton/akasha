import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedLegendaryPenetrationPhysical = {
  id: "01a0d3ea-3a8f-7b9c-b69d-6dddaa892d98",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-legendary-penetration-physical",
  title: "Sharpened at Legendary on Penetration Physical",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1638,
} as const satisfies TemperGearGrade
