import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPenetration = {
  id: "019e2fcd-597e-7f39-a4a2-088e6389dfdb",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-penetration",
  title: "Penetration",
  nodeId: "penetration",
  nodeType: "metric",
  displayOrder: 5,
  parent: "category-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
