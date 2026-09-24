import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitInfusedSuperior = {
  id: "01a0d3e9-274f-7229-b38f-2c0461f4b7b5",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-infused-superior",
  title: "Infused at Superior",
  thing: "temper-weapon-trait/infused",
  quality: "temper-quality/superior",
  value: 0.2,
} as const satisfies TemperGearGrade
