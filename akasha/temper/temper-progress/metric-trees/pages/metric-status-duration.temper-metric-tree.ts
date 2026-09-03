import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStatusDuration = {
  id: "019e2fcd-59cd-7ecf-b5f8-41fc3e79aa5d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-status-duration",
  title: "Status Duration",
  nodeId: "status-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-status-effects",
} as const satisfies TemperMetricTree
