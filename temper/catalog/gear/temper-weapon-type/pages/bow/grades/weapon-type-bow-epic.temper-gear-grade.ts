import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBowEpic = {
  id: "01a0e0d2-8814-737a-a038-a7c7de9308d0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-bow-epic",
  title: "Bow at Epic",
  thing: "temper-weapon-type/bow",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
