import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMovementSneakPenalty = {
  id: "019e2fcd-5a7c-747e-a22f-6a586bacc378",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-movement-sneak-penalty",
  title: "Movement Sneak Penalty",
  nodeId: "movement-sneak-penalty",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-movement-sneak-speed",
} as const satisfies TemperMetricTree
