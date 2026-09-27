import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaulFine = {
  id: "01a0e0d2-8814-76fc-85f7-fb53d970f6a6",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-maul-fine",
  title: "Maul at Fine",
  thing: "temper-weapon-type/maul",
  quality: "temper-quality/fine",
  value: 1304,
} as const satisfies TemperGearGrade
