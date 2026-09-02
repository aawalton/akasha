import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthRestore = {
  id: "01a05fcc-d88f-7064-904e-60e3d030a6e1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-restore",
  title: "Health Restore",
  nodeId: "health-restore",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-health",
} as const satisfies TemperMetricTree
