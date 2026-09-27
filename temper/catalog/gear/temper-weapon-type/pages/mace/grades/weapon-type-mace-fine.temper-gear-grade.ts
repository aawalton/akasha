import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaceFine = {
  id: "01a0e0d2-8814-70f0-bdf4-96bedfa025bc",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-mace-fine",
  title: "Mace at Fine",
  thing: "temper-weapon-type/mace",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
