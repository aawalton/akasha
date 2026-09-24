import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingNormalResistancePhysical = {
  id: "01a0d3e8-caf7-7edb-b4f5-27d77dc8e6ab",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-normal-resistance-physical",
  title: "Defending at Normal on Resistance Physical",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance-physical",
  value: 1428,
} as const satisfies TemperGearGrade
