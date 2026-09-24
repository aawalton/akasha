import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryEpicHealthRecovery = {
  id: "01a0d3eb-1866-70f0-9cfa-c5b09097408b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-epic-health-recovery",
  title: "Prismatic Recovery at Epic on Health Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 80,
} as const satisfies TemperGearGrade
