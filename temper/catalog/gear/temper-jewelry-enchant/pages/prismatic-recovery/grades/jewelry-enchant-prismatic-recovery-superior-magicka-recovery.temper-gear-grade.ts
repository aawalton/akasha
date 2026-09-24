import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoverySuperiorMagickaRecovery = {
  id: "01a0d3eb-d526-7892-8faa-1367e37638b9",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-superior-magicka-recovery",
  title: "Prismatic Recovery at Superior on Magicka Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 75,
} as const satisfies TemperGearGrade
