import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingLegendaryStaminaRecovery = {
  id: "01a0d3e9-81d7-7c9e-acf5-c1159b6841ad",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-legendary-stamina-recovery",
  title: "Invigorating at Legendary on Stamina Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 16,
} as const satisfies TemperGearGrade
