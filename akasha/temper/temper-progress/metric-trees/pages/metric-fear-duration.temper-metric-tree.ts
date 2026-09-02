import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricFearDuration = {
  id: "01a05fcc-d882-719f-8c19-42a0ae962ff3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-fear-duration",
  title: "Fear Duration",
  nodeId: "fear-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-crowd-control",
} as const satisfies TemperMetricTree
