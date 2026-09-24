import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseSuperiorMagickaMaximum = {
  id: "01a0d3e7-fc1c-7946-8ebb-6c636d0ff100",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-superior-magicka-maximum",
  title: "Prismatic Defense at Superior on Magicka Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 390,
} as const satisfies TemperGearGrade
