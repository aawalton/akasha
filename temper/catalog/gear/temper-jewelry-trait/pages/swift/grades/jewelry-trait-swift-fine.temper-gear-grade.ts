import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitSwiftFine = {
  id: "01a0d3ea-cc87-723e-b2a7-fb63dc2cc343",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-swift-fine",
  title: "Swift at Fine",
  thing: "temper-jewelry-trait/swift",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-movement-speed",
  value: 0.04,
} as const satisfies TemperGearGrade
