import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPower = {
  id: "01a05fcc-d89e-77c1-99e8-a0fa9c3b8165",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-power",
  title: "Power",
  nodeId: "power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "category-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
