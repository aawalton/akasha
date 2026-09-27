import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaulLegendary = {
  id: "01a0e0d2-8814-7174-be9e-d189b6b6345c",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-maul-legendary",
  title: "Maul at Legendary",
  thing: "temper-weapon-type/maul",
  quality: "temper-quality/legendary",
  value: 1571,
} as const satisfies TemperGearGrade
