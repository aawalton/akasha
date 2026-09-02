import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResurrectSpeed = {
  id: "01a05fcc-d8a2-7855-b1c0-e79cbd24b90c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resurrect-speed",
  title: "Resurrect Speed",
  nodeId: "resurrect-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-resurrection",
} as const satisfies TemperMetricTree
