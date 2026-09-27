import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaceNormal = {
  id: "01a0e0d2-8814-7183-8c39-ff8193aa8546",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-mace-normal",
  title: "Mace at Normal",
  thing: "temper-weapon-type/mace",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
