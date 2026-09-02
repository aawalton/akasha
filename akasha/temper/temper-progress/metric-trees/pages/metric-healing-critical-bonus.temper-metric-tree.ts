import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonus = {
  id: "01a05fcc-d88a-75f9-9d60-1482d5ef6f4d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus",
  title: "Healing Critical Bonus",
  nodeId: "healing-critical-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-healing-critical",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
