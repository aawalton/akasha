import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantMagickaFine = {
  id: "01a0d3e7-57d5-700c-b472-92a8940972fd",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-magicka-fine",
  title: "Magicka at Fine",
  thing: "temper-armor-enchant/magicka",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 704,
} as const satisfies TemperGearGrade
