import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBattleaxeNormal = {
  id: "01a0e0d2-8814-7b50-aa4d-93894a71c3c4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-battleaxe-normal",
  title: "Battleaxe at Normal",
  thing: "temper-weapon-type/battleaxe",
  quality: "temper-quality/normal",
  value: 1262,
} as const satisfies TemperGearGrade
