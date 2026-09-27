import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeSwordNormal = {
  id: "01a0e0d2-8814-7966-9f90-94e6b6922bc3",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-sword-normal",
  title: "Sword at Normal",
  thing: "temper-weapon-type/sword",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
