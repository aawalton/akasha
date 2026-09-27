import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeGreatswordNormal = {
  id: "01a0e0d2-8814-723e-935c-ab6fed471dd0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-greatsword-normal",
  title: "Greatsword at Normal",
  thing: "temper-weapon-type/greatsword",
  quality: "temper-quality/normal",
  value: 1262,
} as const satisfies TemperGearGrade
