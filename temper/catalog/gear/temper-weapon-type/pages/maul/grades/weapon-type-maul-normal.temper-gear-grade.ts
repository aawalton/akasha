import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaulNormal = {
  id: "01a0e0d2-8814-76c2-a5f3-4960c9c42591",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-maul-normal",
  title: "Maul at Normal",
  thing: "temper-weapon-type/maul",
  quality: "temper-quality/normal",
  value: 1262,
} as const satisfies TemperGearGrade
