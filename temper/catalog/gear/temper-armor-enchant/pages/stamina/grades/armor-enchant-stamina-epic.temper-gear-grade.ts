import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantStaminaEpic = {
  id: "01a0d3e8-20f6-7cc5-b361-e25df139d42d",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-stamina-epic",
  title: "Stamina at Epic",
  thing: "temper-armor-enchant/stamina",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 802,
  createdAt: "2026-09-24T14:53:20.502Z",
  updatedAt: "2026-09-24T14:53:35.000Z",
} as const satisfies TemperGearGrade
