import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBattleaxeSuperior = {
  id: "01a0e0d2-8814-73b0-a7fe-1d9a830044ad",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-battleaxe-superior",
  title: "Battleaxe at Superior",
  thing: "temper-weapon-type/battleaxe",
  quality: "temper-quality/superior",
  value: 1304,
} as const satisfies TemperGearGrade
