import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBlockMitigation = {
  id: "01a05fcc-d86f-723f-8d13-274c41cfed23",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-block-mitigation",
  title: "Block Mitigation",
  nodeId: "block-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-block",
} as const satisfies TemperMetricTree
