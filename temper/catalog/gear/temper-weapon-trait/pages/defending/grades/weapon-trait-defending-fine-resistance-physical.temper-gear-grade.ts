import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingFineResistancePhysical = {
  id: "01a0d3e8-b81f-7318-b991-efbf085921fa",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-fine-resistance-physical",
  title: "Defending at Fine on Resistance Physical",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance-physical",
  value: 1485,
} as const satisfies TemperGearGrade
