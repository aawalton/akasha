import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingReductionBase = {
  id: "01a05fcc-d88d-786e-9795-c8d82661d58a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-reduction-base",
  title: "Healing Reduction Base",
  nodeId: "healing-reduction-base",
  nodeType: "metric",
  displayOrder: 4,
  parent: "category-healing",
} as const satisfies TemperMetricTree
