import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingLegendaryPenetrationPhysical = {
  id: "01a0d3e7-a7a5-7a27-a4dd-8984fb80be3f",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-legendary-penetration-physical",
  title: "Crushing at Legendary on Penetration Physical",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 2108,
} as const satisfies TemperGearGrade
