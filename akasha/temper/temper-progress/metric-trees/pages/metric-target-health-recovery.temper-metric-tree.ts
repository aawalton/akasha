import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetHealthRecovery = {
  id: "01a05fcc-d8ab-7811-917a-56a5de212f52",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-health-recovery",
  title: "Target Health Recovery",
  nodeId: "target-health-recovery",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-healing",
} as const satisfies TemperMetricTree
