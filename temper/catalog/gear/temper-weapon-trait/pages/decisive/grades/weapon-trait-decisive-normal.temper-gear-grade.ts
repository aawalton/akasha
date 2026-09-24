import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDecisiveNormal = {
  id: "01a0d3e8-6901-72b2-bea9-4813bc5f01ac",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-decisive-normal",
  title: "Decisive at Normal",
  thing: "temper-weapon-trait/decisive",
  quality: "temper-quality/normal",
  value: 0.191,
} as const satisfies TemperGearGrade
