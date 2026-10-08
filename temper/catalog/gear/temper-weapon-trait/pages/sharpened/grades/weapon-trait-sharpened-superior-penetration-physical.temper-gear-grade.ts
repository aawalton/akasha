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
  rawValue: 1542.5454545454545,
  createdAt: "2026-09-24T14:55:31.046Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
