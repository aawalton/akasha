import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeAxeLegendary = {
  id: "01a0e0d2-8813-7b87-9f0d-ad51f2a3d617",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-axe-legendary",
  title: "Axe at Legendary",
  thing: "temper-weapon-type/axe",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
