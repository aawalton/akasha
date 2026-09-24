import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantMagickaEpic = {
  id: "01a0d3e7-4fa0-79d9-b100-b2ca5dfea047",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-magicka-epic",
  title: "Magicka at Epic",
  thing: "temper-armor-enchant/magicka",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 802,
} as const satisfies TemperGearGrade
