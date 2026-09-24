import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitInfusedEpic = {
  id: "01a0d3ea-2f9c-7960-bccf-3ad1bad7e4e5",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-infused-epic",
  title: "Infused at Epic",
  thing: "temper-jewelry-trait/infused",
  quality: "temper-quality/epic",
  value: 0.51,
} as const satisfies TemperGearGrade
