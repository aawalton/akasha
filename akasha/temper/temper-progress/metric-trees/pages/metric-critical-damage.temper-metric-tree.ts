import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamage = {
  id: "01a05fcc-d873-7ec4-819f-e4bf3f9a1660",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage",
  title: "Critical Damage",
  nodeId: "critical-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-critical-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
