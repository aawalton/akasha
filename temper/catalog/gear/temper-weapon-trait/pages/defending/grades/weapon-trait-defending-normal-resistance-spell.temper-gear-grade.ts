import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingNormalResistanceSpell = {
  id: "01a0d3e8-d2c3-720f-b214-63cc7d0ac4c4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-normal-resistance-spell",
  title: "Defending at Normal on Resistance Spell",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance-spell",
  value: 1428,
} as const satisfies TemperGearGrade
