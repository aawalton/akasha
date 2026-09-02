import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetHealingReceived = {
  id: "01a05fcc-d8ab-78af-99be-1c329605cd80",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-healing-received",
  title: "Target Healing Received",
  nodeId: "target-healing-received",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-healing",
} as const satisfies TemperMetricTree
