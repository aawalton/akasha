import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitNirnhonedNormal = {
  id: "01a0d3e9-4543-7c14-aa3a-ff3bc2a24392",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-nirnhoned-normal",
  title: "Nirnhoned at Normal",
  thing: "temper-weapon-trait/nirnhoned",
  quality: "temper-quality/normal",
  value: 0.12,
} as const satisfies TemperGearGrade
