import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitNirnhonedSuperior = {
  id: "01a0d3e9-c5e2-7bb2-b74a-fffe174c9a72",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-nirnhoned-superior",
  title: "Nirnhoned at Superior",
  thing: "temper-armor-trait/nirnhoned",
  quality: "temper-quality/superior",
  value: 236,
} as const satisfies TemperGearGrade
