import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingReceivedBase = {
  id: "01a05fcc-d88d-71ee-90fb-c67ce9a5fa89",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-received-base",
  title: "Healing Received Base",
  nodeId: "healing-received-base",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-healing-received",
} as const satisfies TemperMetricTree
