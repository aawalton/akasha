import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitNirnhonedEpic = {
  id: "01a0d3e9-3675-73ec-ac52-00ff9ebcd06b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-nirnhoned-epic",
  title: "Nirnhoned at Epic",
  thing: "temper-weapon-trait/nirnhoned",
  quality: "temper-quality/epic",
  value: 0.14,
} as const satisfies TemperGearGrade
