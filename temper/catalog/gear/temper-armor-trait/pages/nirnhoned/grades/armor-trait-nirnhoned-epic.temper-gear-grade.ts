import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitNirnhonedEpic = {
  id: "01a0d3e9-ad63-7d24-aac9-2d01ce602a04",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-nirnhoned-epic",
  title: "Nirnhoned at Epic",
  thing: "temper-armor-trait/nirnhoned",
  quality: "temper-quality/epic",
  value: 244,
} as const satisfies TemperGearGrade
