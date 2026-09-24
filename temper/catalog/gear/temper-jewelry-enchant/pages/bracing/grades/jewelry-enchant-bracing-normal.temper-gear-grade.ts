import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBracingNormal = {
  id: "01a0d3e7-6867-7456-9c69-74e62fd90646",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bracing-normal",
  title: "Bracing at Normal",
  thing: "temper-jewelry-enchant/bracing",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-block-cost",
  value: -154,
} as const satisfies TemperGearGrade
