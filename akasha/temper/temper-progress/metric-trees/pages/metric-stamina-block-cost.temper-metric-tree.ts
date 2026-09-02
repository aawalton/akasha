import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaBlockCost = {
  id: "01a05fcc-d8a3-7989-a566-edc4bb3ce62a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-block-cost",
  title: "Stamina Block Cost",
  nodeId: "stamina-block-cost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
