import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricSneakCost = {
  id: "01a05fcc-d8a2-7331-8580-0feba4041862",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-sneak-cost",
  title: "Sneak Cost",
  nodeId: "sneak-cost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-costs",
} as const satisfies TemperMetricTree
