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
  rawValue: 1485.2727272727273,
  createdAt: "2026-09-24T14:54:01.488Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
