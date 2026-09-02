import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneDirect = {
  id: "01a05fcc-d88b-7206-9068-9b30617a3f6b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-direct",
  title: "Healing Done Direct",
  nodeId: "healing-done-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
