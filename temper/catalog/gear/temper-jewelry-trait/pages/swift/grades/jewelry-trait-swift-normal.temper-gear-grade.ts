import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitSwiftNormal = {
  id: "01a0d3ea-d52c-7a47-b67d-e6e6f8b8ee8a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-swift-normal",
  title: "Swift at Normal",
  thing: "temper-jewelry-trait/swift",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-movement-speed",
  value: 0.03,
} as const satisfies TemperGearGrade
