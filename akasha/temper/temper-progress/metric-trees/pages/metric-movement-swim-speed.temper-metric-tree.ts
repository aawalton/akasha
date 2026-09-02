import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementSwimSpeed = {
  id: "01a05fcc-d89b-7551-9746-ea573dbc71dd",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-swim-speed",
  title: "Movement Swim Speed",
  nodeId: "movement-swim-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-movement-speed",
} as const satisfies TemperMetricTree
