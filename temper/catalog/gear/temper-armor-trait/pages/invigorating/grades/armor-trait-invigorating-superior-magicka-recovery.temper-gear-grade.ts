import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingSuperiorMagickaRecovery = {
  id: "01a0d3e9-5da5-7879-ad63-131b9d92a378",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-superior-magicka-recovery",
  title: "Invigorating at Superior on Magicka Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 12,
} as const satisfies TemperGearGrade
