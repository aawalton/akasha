import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitReinforcedFine = {
  id: "01a0d3e9-dcbb-7620-820d-719370061a23",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-reinforced-fine",
  title: "Reinforced at Fine",
  thing: "temper-armor-trait/reinforced",
  quality: "temper-quality/fine",
  value: 0.13,
} as const satisfies TemperGearGrade
