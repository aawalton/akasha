import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBattleaxeFine = {
  id: "01a0e0d2-8814-75a9-b79f-f677f7657d55",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-battleaxe-fine",
  title: "Battleaxe at Fine",
  thing: "temper-weapon-type/battleaxe",
  quality: "temper-quality/fine",
  value: 1304,
} as const satisfies TemperGearGrade
