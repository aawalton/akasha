import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantMagickaLegendary = {
  id: "01a0d3e7-7993-7793-a0ca-70be34c05ac0",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-magicka-legendary",
  title: "Magicka at Legendary",
  thing: "temper-armor-enchant/magicka",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 868,
} as const satisfies TemperGearGrade
