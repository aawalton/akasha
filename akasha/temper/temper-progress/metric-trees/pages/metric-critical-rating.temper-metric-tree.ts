import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalRating = {
  id: "01a05fcc-d874-7739-9c7b-7f4b081930c1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-rating",
  title: "Critical Rating",
  nodeId: "critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-critical-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
