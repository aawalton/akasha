import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitSwiftSuperior = {
  id: "01a0d3ea-dce1-7c6e-ba91-1c8843eaefb7",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-swift-superior",
  title: "Swift at Superior",
  thing: "temper-jewelry-trait/swift",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-movement-speed",
  value: 0.05,
} as const satisfies TemperGearGrade
