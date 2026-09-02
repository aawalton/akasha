import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPenetration = {
  id: "01a05fcc-d89c-7fbb-8bc6-a01076d0ea91",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-penetration",
  title: "Penetration",
  nodeId: "penetration",
  nodeType: "metric",
  displayOrder: 5,
  parent: "category-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
