import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitInfusedFine = {
  id: "01a0d3e9-0e04-748f-9630-e49b6557d08d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-infused-fine",
  title: "Infused at Fine",
  thing: "temper-weapon-trait/infused",
  quality: "temper-quality/fine",
  value: 0.15,
} as const satisfies TemperGearGrade
