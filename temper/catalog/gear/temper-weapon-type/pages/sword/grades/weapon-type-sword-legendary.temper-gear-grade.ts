import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeSwordLegendary = {
  id: "01a0e0d2-8814-7e49-998c-f4255dfd19f3",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-sword-legendary",
  title: "Sword at Legendary",
  thing: "temper-weapon-type/sword",
  quality: "temper-quality/legendary",
  value: 1335,
  createdAt: "2026-09-27T03:04:48.916Z",
  updatedAt: "2026-09-27T03:05:02.000Z",
} as const satisfies TemperGearGrade
