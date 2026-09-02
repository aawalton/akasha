import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResurrectTime = {
  id: "01a05fcc-d8a2-7c56-952e-4a98ebc80308",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resurrect-time",
  title: "Resurrect Time",
  nodeId: "resurrect-time",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-resurrection",
} as const satisfies TemperMetricTree
