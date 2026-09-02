import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStatusDuration = {
  id: "01a05fcc-d8a5-793d-b8fc-257a1f219a40",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-status-duration",
  title: "Status Duration",
  nodeId: "status-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-status-effects",
} as const satisfies TemperMetricTree
