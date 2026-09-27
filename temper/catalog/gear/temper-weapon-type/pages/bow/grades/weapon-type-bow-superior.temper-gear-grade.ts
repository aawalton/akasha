import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBowSuperior = {
  id: "01a0e0d2-8814-7283-a060-422ec948e4e3",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-bow-superior",
  title: "Bow at Superior",
  thing: "temper-weapon-type/bow",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
