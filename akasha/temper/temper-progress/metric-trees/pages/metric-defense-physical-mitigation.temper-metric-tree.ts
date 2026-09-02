import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefensePhysicalMitigation = {
  id: "01a05fcc-d87e-7979-9d7b-9a6d9a496ec6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-physical-mitigation",
  title: "Defense Physical Mitigation",
  nodeId: "defense-physical-mitigation",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
