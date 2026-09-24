import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingFineStaminaRecovery = {
  id: "01a0d3e9-28d6-776b-9ed3-bcd61d403b06",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-fine-stamina-recovery",
  title: "Invigorating at Fine on Stamina Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 10,
} as const satisfies TemperGearGrade
