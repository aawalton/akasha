import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaulEpic = {
  id: "01a0e0d2-8814-7149-a3ad-ff49af844fa0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-maul-epic",
  title: "Maul at Epic",
  thing: "temper-weapon-type/maul",
  quality: "temper-quality/epic",
  value: 1332,
} as const satisfies TemperGearGrade
