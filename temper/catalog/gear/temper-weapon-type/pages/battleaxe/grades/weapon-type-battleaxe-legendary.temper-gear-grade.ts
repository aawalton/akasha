import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBattleaxeLegendary = {
  id: "01a0e0d2-8814-7a40-92d6-af9e149c06db",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-battleaxe-legendary",
  title: "Battleaxe at Legendary",
  thing: "temper-weapon-type/battleaxe",
  quality: "temper-quality/legendary",
  value: 1571,
} as const satisfies TemperGearGrade
