import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaRecovery = {
  id: "01a05fcc-d8a5-765d-8c27-920d26ef8dce",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-recovery",
  title: "Stamina Recovery",
  nodeId: "stamina-recovery",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
