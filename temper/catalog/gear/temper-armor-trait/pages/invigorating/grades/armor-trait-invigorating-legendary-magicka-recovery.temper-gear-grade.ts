import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingLegendaryMagickaRecovery = {
  id: "01a0d3e9-78b1-7dba-8aa5-b3fb4608113c",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-legendary-magicka-recovery",
  title: "Invigorating at Legendary on Magicka Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 16,
} as const satisfies TemperGearGrade
