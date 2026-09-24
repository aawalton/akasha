import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingEpicResistanceSpell = {
  id: "01a0d3e8-af5a-7916-aa5a-c7ef1b1c85dd",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-epic-resistance-spell",
  title: "Defending at Epic on Resistance Spell",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance-spell",
  value: 1580,
} as const satisfies TemperGearGrade
