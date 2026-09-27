import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBowNormal = {
  id: "01a0e0d2-8814-78e2-a429-f7f84fe8888e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-bow-normal",
  title: "Bow at Normal",
  thing: "temper-weapon-type/bow",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
