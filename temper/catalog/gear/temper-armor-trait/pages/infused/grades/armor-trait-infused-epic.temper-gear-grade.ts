import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInfusedEpic = {
  id: "01a0d3e8-cb36-752c-8c0c-e7f4a394f004",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-infused-epic",
  title: "Infused at Epic",
  thing: "temper-armor-trait/infused",
  quality: "temper-quality/epic",
  value: 0.21,
} as const satisfies TemperGearGrade
