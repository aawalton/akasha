import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingEpicResistancePhysical = {
  id: "01a0d3e8-a8b5-7472-a5f2-2867754b23e9",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-epic-resistance-physical",
  title: "Defending at Epic on Resistance Physical",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance-physical",
  value: 1580,
} as const satisfies TemperGearGrade
