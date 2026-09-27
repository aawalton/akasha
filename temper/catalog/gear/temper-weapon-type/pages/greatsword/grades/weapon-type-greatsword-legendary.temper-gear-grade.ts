import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeGreatswordLegendary = {
  id: "01a0e0d2-8814-74ee-bb39-582fef9b5b3f",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-greatsword-legendary",
  title: "Greatsword at Legendary",
  thing: "temper-weapon-type/greatsword",
  quality: "temper-quality/legendary",
  value: 1571,
} as const satisfies TemperGearGrade
