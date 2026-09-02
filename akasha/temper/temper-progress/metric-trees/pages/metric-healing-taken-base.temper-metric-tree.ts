import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingTakenBase = {
  id: "01a05fcc-d88d-751b-8d45-7deda445b337",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-taken-base",
  title: "Healing Taken Base",
  nodeId: "healing-taken-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-healing-received",
} as const satisfies TemperMetricTree
