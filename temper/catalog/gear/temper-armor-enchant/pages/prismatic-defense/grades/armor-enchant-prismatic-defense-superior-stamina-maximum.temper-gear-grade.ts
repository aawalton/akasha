import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseSuperiorStaminaMaximum = {
  id: "01a0d3e8-050b-7445-9bbe-7ebd5068fab0",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-superior-stamina-maximum",
  title: "Prismatic Defense at Superior on Stamina Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 390,
} as const satisfies TemperGearGrade
