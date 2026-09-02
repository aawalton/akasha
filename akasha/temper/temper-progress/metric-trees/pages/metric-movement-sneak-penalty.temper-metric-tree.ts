import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementSneakPenalty = {
  id: "01a05fcc-d89a-71d5-a612-8f788bdc3b33",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-sneak-penalty",
  title: "Movement Sneak Penalty",
  nodeId: "movement-sneak-penalty",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-movement-sneak-speed",
} as const satisfies TemperMetricTree
