import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitSwiftEpic = {
  id: "01a0d3ea-c3cb-7b77-9cbf-b795a8649efe",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-swift-epic",
  title: "Swift at Epic",
  thing: "temper-jewelry-trait/swift",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-movement-speed",
  value: 0.06,
} as const satisfies TemperGearGrade
