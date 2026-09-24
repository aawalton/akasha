import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoverySuperiorHealthRecovery = {
  id: "01a0d3eb-a347-7966-97e3-9817c441d1d5",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-superior-health-recovery",
  title: "Prismatic Recovery at Superior on Health Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 75,
} as const satisfies TemperGearGrade
