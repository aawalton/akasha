import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBowFine = {
  id: "01a0e0d2-8814-7e2a-8fed-562e1c15ddb1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-bow-fine",
  title: "Bow at Fine",
  thing: "temper-weapon-type/bow",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
