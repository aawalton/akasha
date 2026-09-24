import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantHealthRecoveryLegendary = {
  id: "01a0d3e9-3be3-754e-be7f-66cf63137fab",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-health-recovery-legendary",
  title: "Health Recovery at Legendary",
  thing: "temper-jewelry-enchant/health-recovery",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 169,
} as const satisfies TemperGearGrade
