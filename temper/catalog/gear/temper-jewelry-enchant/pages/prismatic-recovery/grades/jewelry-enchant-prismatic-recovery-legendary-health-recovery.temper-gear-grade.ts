import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryLegendaryHealthRecovery = {
  id: "01a0d3eb-e915-720d-9ef1-2febea2ac3e8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-legendary-health-recovery",
  title: "Prismatic Recovery at Legendary on Health Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 84,
} as const satisfies TemperGearGrade
