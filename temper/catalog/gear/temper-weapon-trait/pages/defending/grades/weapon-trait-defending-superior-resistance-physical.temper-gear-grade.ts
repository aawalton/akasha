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
} as const satisfies TemperGearGrade
