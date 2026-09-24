import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitReinforcedSuperior = {
  id: "01a0d3e9-f5e8-755c-a208-892bd9b930b0",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-reinforced-superior",
  title: "Reinforced at Superior",
  thing: "temper-armor-trait/reinforced",
  quality: "temper-quality/superior",
  value: 0.14,
} as const satisfies TemperGearGrade
