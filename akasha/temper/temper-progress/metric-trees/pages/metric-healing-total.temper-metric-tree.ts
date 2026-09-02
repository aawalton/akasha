import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingTotal = {
  id: "01a05fcc-d88d-7f93-b695-19643b7dd876",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-total",
  title: "Healing Total",
  nodeId: "healing-total",
  nodeType: "metric",
  displayOrder: 6,
  parent: "category-healing",
} as const satisfies TemperMetricTree
