import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaceEpic = {
  id: "01a0e0d2-8814-7007-a161-cb41d85ee8af",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-mace-epic",
  title: "Mace at Epic",
  thing: "temper-weapon-type/mace",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
