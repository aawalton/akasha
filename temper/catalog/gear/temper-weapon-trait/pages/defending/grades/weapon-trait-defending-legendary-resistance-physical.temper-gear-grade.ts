import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDefendingLegendaryResistancePhysical = {
  id: "01a0d3e8-f796-7888-9de3-6d29599db4ae",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-defending-legendary-resistance-physical",
  title: "Defending at Legendary on Resistance Physical",
  thing: "temper-weapon-trait/defending",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance-physical",
  value: 1638,
} as const satisfies TemperGearGrade
