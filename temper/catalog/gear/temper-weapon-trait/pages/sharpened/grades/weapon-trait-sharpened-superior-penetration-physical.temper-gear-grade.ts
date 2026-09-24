import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedSuperiorPenetrationPhysical = {
  id: "01a0d3ea-1ee6-7be3-a722-fca7bee754b5",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-superior-penetration-physical",
  title: "Sharpened at Superior on Penetration Physical",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1542,
} as const satisfies TemperGearGrade
