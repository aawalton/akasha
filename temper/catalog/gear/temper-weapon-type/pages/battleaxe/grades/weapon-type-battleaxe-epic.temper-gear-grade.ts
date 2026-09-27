import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBattleaxeEpic = {
  id: "01a0e0d2-8814-7932-9796-d9ee8e9855f8",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-battleaxe-epic",
  title: "Battleaxe at Epic",
  thing: "temper-weapon-type/battleaxe",
  quality: "temper-quality/epic",
  value: 1332,
} as const satisfies TemperGearGrade
