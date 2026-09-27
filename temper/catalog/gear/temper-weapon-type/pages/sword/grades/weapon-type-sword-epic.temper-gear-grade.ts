import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeSwordEpic = {
  id: "01a0e0d2-8814-7522-8ff4-75ae50272a86",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-sword-epic",
  title: "Sword at Epic",
  thing: "temper-weapon-type/sword",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
