import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitDecisiveLegendary = {
  id: "01a0d3e8-7814-702a-ad65-be1126d2ea6e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-decisive-legendary",
  title: "Decisive at Legendary",
  thing: "temper-weapon-trait/decisive",
  quality: "temper-quality/legendary",
  value: 0.275,
} as const satisfies TemperGearGrade
