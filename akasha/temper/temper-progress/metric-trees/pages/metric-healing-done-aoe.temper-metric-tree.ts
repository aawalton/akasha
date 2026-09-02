import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneAoe = {
  id: "01a05fcc-d88b-7427-9a9a-70c88840efcd",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-aoe",
  title: "Healing Done Aoe",
  nodeId: "healing-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
