import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitNirnhonedNormal = {
  id: "01a0d3e9-bd34-7f1b-b855-e1d36063cfa1",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-nirnhoned-normal",
  title: "Nirnhoned at Normal",
  thing: "temper-armor-trait/nirnhoned",
  quality: "temper-quality/normal",
  value: 220,
} as const satisfies TemperGearGrade
