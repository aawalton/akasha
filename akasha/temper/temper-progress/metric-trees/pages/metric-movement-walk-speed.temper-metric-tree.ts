import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementWalkSpeed = {
  id: "01a05fcc-d89b-7299-b260-599cc01c1398",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-walk-speed",
  title: "Movement Walk Speed",
  nodeId: "movement-walk-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-movement-speed",
} as const satisfies TemperMetricTree
