import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeGreatswordFine = {
  id: "01a0e0d2-8814-7a91-a01c-5debe39b7350",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-greatsword-fine",
  title: "Greatsword at Fine",
  thing: "temper-weapon-type/greatsword",
  quality: "temper-quality/fine",
  value: 1304,
} as const satisfies TemperGearGrade
