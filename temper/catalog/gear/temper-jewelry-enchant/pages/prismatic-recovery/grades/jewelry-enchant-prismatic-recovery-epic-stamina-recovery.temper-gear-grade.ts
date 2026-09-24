import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryEpicStaminaRecovery = {
  id: "01a0d3eb-2bca-73a1-9f78-8876fac3083a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-epic-stamina-recovery",
  title: "Prismatic Recovery at Epic on Stamina Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 80,
} as const satisfies TemperGearGrade
