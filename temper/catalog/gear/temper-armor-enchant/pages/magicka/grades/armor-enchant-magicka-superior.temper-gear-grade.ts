import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantMagickaSuperior = {
  id: "01a0d3e7-7134-7b18-b16d-13e125f34566",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-magicka-superior",
  title: "Magicka at Superior",
  thing: "temper-armor-enchant/magicka",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 763,
} as const satisfies TemperGearGrade
