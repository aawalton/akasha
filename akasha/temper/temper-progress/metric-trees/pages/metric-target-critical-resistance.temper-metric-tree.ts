import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalResistance = {
  id: "01a05fcc-d8a9-7ff9-b6a4-1d9031f24024",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-resistance",
  title: "Target Critical Resistance",
  nodeId: "target-critical-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
