import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistance = {
  id: "019e2fcd-5a20-779a-bb2f-3ebf355ce12f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance",
  title: "Resistance",
  nodeId: "resistance",
  nodeType: "metric",
  displayOrder: 3,
  parent: "category-toughness",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
