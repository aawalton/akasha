import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedEpicPenetrationPhysical = {
  id: "01a0d3e9-e91d-7d7c-806b-a16b8328db33",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-epic-penetration-physical",
  title: "Sharpened at Epic on Penetration Physical",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1580,
} as const satisfies TemperGearGrade
