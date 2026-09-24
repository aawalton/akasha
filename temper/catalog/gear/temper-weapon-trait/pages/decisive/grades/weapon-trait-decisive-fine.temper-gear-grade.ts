import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDecisiveFine = {
  id: "01a0d3e8-6149-747d-9fd5-c77380c9a927",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-decisive-fine",
  title: "Decisive at Fine",
  thing: "temper-weapon-trait/decisive",
  quality: "temper-quality/fine",
  value: 0.212,
} as const satisfies TemperGearGrade
