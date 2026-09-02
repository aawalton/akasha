import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaDodgeCost = {
  id: "01a05fcc-d8a4-73a3-b0b8-01d484ce7c21",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-dodge-cost",
  title: "Stamina Dodge Cost",
  nodeId: "stamina-dodge-cost",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
