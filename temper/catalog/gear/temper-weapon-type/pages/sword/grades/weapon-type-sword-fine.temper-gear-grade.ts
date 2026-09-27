import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeSwordFine = {
  id: "01a0e0d2-8814-758f-9e6b-a9860d973d2b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-sword-fine",
  title: "Sword at Fine",
  thing: "temper-weapon-type/sword",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
