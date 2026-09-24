import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantMagickaNormal = {
  id: "01a0d3e7-6894-75c2-8f8e-bcd4940721ef",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-magicka-normal",
  title: "Magicka at Normal",
  thing: "temper-armor-enchant/magicka",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 668,
} as const satisfies TemperGearGrade
