import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBlockSpeed = {
  id: "01a05fcc-d86f-76ca-9419-0f1d0ef1be14",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-block-speed",
  title: "Block Speed",
  nodeId: "block-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-block",
} as const satisfies TemperMetricTree
