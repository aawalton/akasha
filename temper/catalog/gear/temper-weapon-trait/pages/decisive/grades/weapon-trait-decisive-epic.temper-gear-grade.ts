import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDecisiveEpic = {
  id: "01a0d3e8-5a22-748b-977c-987d22172848",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-decisive-epic",
  title: "Decisive at Epic",
  thing: "temper-weapon-trait/decisive",
  quality: "temper-quality/epic",
  value: 0.254,
} as const satisfies TemperGearGrade
