import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedNormalPenetrationPhysical = {
  id: "01a0d3ea-0cc2-74ef-8d37-501ed85b00e6",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-normal-penetration-physical",
  title: "Sharpened at Normal on Penetration Physical",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1428,
  createdAt: "2026-09-24T14:55:26.402Z",
  updatedAt: "2026-09-24T14:55:57.000Z",
} as const satisfies TemperGearGrade
