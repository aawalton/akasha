import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetResistance = {
  id: "01a05fcc-d8ad-7bf2-bca3-5e37dcfa54ca",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-resistance",
  title: "Target Resistance",
  nodeId: "target-resistance",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-target-toughness",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
