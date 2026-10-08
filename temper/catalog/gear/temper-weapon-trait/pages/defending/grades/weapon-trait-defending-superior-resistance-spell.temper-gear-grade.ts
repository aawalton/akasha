import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingSuperiorResistanceSpell = {
  id: "01a0d3e8-eec0-7749-8ecc-1d4f19dfdf83",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-superior-resistance-spell",
  title: "Defending at Superior on Resistance Spell",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance-spell",
  value: 1542,
  rawValue: 1542.5454545454545,
  createdAt: "2026-09-24T14:54:13.184Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
