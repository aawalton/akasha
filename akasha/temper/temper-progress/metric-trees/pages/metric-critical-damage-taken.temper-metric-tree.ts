import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageTaken = {
  id: "01a05fcc-d873-7fb0-b0c0-0ddbd34019c3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-taken",
  title: "Critical Damage Taken",
  nodeId: "critical-damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-critical-defense",
} as const satisfies TemperMetricTree
