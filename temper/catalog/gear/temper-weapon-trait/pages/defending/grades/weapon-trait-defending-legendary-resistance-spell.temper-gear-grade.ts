import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingLegendaryResistanceSpell = {
  id: "01a0d3e9-003b-765a-a618-dcc2514a0de0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-legendary-resistance-spell",
  title: "Defending at Legendary on Resistance Spell",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance-spell",
  value: 1638,
  createdAt: "2026-09-24T14:54:17.659Z",
  updatedAt: "2026-09-24T14:55:12.000Z",
} as const satisfies TemperGearGrade
