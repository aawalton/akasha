import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingSuperiorResistancePhysical = {
  id: "01a0d3e8-e610-7770-aabb-bd02471522c7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-superior-resistance-physical",
  title: "Defending at Superior on Resistance Physical",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance-physical",
  value: 1542,
  rawValue: 1542.5454545454545,
  createdAt: "2026-09-24T14:54:10.960Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
