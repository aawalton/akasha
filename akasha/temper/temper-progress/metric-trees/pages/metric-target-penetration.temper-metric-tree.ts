import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPenetration = {
  id: "01a05fcc-d8ab-7033-b55b-13a67b0fa9fe",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-penetration",
  title: "Target Penetration",
  nodeId: "target-penetration",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
