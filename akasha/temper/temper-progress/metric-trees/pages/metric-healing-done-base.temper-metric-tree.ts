import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneBase = {
  id: "01a05fcc-d88b-75a5-a8d3-49ad4082cd93",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-base",
  title: "Healing Done Base",
  nodeId: "healing-done-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
