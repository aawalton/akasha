import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingFineResistanceSpell = {
  id: "01a0d3e8-c110-7714-a279-faf595ee4ae2",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-fine-resistance-spell",
  title: "Defending at Fine on Resistance Spell",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance-spell",
  value: 1485,
} as const satisfies TemperGearGrade
