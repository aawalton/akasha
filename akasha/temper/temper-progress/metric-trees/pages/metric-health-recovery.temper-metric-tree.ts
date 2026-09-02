import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthRecovery = {
  id: "01a05fcc-d88e-7e61-b242-1c282ee1ec45",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-recovery",
  title: "Health Recovery",
  nodeId: "health-recovery",
  nodeType: "metric",
  displayOrder: 7,
  parent: "category-healing",
} as const satisfies TemperMetricTree
