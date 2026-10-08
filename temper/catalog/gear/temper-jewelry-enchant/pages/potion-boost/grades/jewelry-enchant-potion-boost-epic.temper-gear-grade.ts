import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostEpic = {
  id: "01a0d3ea-aceb-7b9c-b8ef-89665f038170",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-epic",
  title: "Potion Boost at Epic",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 35,
  createdAt: "2026-09-24T14:56:07.403Z",
  updatedAt: "2026-09-24T14:57:17.000Z",
} as const satisfies TemperGearGrade
