import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementRunSpeed = {
  id: "01a05fcc-d899-72fb-b93f-8d34cfa794d6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-run-speed",
  title: "Movement Run Speed",
  nodeId: "movement-run-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-movement-speed",
} as const satisfies TemperMetricTree
