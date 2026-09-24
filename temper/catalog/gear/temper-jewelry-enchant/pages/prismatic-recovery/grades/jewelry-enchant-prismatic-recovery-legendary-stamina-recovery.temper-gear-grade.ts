import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryLegendaryStaminaRecovery = {
  id: "01a0d3eb-fcd4-7996-ae25-e14bc3e6fb55",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-legendary-stamina-recovery",
  title: "Prismatic Recovery at Legendary on Stamina Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 84,
} as const satisfies TemperGearGrade
