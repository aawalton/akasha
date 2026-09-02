import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMountedSpeed = {
  id: "01a05fcc-d898-7ae5-b8e9-6bd5361063bc",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-mounted-speed",
  title: "Mounted Speed",
  nodeId: "mounted-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "category-mobility",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
