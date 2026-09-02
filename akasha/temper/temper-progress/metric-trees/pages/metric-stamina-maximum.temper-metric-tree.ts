import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaMaximum = {
  id: "01a05fcc-d8a4-76db-9fae-bca2b36ed211",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-maximum",
  title: "Stamina Maximum",
  nodeId: "stamina-maximum",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
