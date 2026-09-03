import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonus = {
  id: "019e2fcd-5a63-7b2f-b643-8461eeb4f00b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus",
  title: "Healing Critical Bonus",
  nodeId: "healing-critical-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-healing-critical",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
