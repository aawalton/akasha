import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaSprintCost = {
  id: "01a05fcc-d8a5-7919-a7f7-6ffd90c47041",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-sprint-cost",
  title: "Stamina Sprint Cost",
  nodeId: "stamina-sprint-cost",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
