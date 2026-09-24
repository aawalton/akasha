import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitInfusedNormal = {
  id: "01a0d3e9-1ebb-7f3d-8d85-70ec4d758413",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-infused-normal",
  title: "Infused at Normal",
  thing: "temper-weapon-trait/infused",
  quality: "temper-quality/normal",
  value: 0.1,
} as const satisfies TemperGearGrade
