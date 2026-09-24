import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitReinforcedEpic = {
  id: "01a0d3e9-d519-7476-8154-867f1d34b6f2",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-reinforced-epic",
  title: "Reinforced at Epic",
  thing: "temper-armor-trait/reinforced",
  quality: "temper-quality/epic",
  value: 0.15,
} as const satisfies TemperGearGrade
