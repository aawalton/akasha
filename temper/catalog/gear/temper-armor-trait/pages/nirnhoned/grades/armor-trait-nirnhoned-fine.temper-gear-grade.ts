import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitNirnhonedFine = {
  id: "01a0d3e9-b668-7bfd-bde0-6fbef173731b",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-nirnhoned-fine",
  title: "Nirnhoned at Fine",
  thing: "temper-armor-trait/nirnhoned",
  quality: "temper-quality/fine",
  value: 228,
} as const satisfies TemperGearGrade
