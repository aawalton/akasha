import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingSuperiorStaminaRecovery = {
  id: "01a0d3e9-6654-7b74-ae9c-59ddfbde35d0",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-superior-stamina-recovery",
  title: "Invigorating at Superior on Stamina Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 12,
} as const satisfies TemperGearGrade
