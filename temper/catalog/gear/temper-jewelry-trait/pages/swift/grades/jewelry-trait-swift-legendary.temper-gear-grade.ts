import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitSwiftLegendary = {
  id: "01a0d3ea-e50f-7959-a6f8-23e4308f2aab",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-swift-legendary",
  title: "Swift at Legendary",
  thing: "temper-jewelry-trait/swift",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-movement-speed",
  value: 0.07,
} as const satisfies TemperGearGrade
