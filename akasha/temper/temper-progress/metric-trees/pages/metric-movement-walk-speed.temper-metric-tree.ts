import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementWalkSpeed = {
  id: "019e2fcd-5a78-79f2-8821-ab22dcf3d6ba",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-walk-speed",
  title: "Movement Walk Speed",
  nodeId: "movement-walk-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-movement-speed",
} as const satisfies TemperMetricTree
