import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDecisiveSuperior = {
  id: "01a0d3e8-70b3-7ba5-9fb9-16597fb82c55",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-decisive-superior",
  title: "Decisive at Superior",
  thing: "temper-weapon-trait/decisive",
  quality: "temper-quality/superior",
  value: 0.232,
} as const satisfies TemperGearGrade
