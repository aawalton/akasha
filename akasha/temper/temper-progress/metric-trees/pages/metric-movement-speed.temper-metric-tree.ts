import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementSpeed = {
  id: "01a05fcc-d89a-79fd-9179-01ff78555486",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-speed",
  title: "Movement Speed",
  nodeId: "movement-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "category-mobility",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
