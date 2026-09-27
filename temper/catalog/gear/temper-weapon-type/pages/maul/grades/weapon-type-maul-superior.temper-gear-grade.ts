import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaulSuperior = {
  id: "01a0e0d2-8814-7428-8dc5-23ebbab25fa1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-maul-superior",
  title: "Maul at Superior",
  thing: "temper-weapon-type/maul",
  quality: "temper-quality/superior",
  value: 1304,
} as const satisfies TemperGearGrade
