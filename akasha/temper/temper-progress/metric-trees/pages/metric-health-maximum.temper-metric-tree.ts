import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthMaximum = {
  id: "01a05fcc-d88e-70e6-8b75-9db2c3a9d4d8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-maximum",
  title: "Health Maximum",
  nodeId: "health-maximum",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-health",
} as const satisfies TemperMetricTree
