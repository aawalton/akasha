import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricChilledDamage = {
  id: "01a05fcc-d871-7389-96ea-2e925f234eab",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-chilled-damage",
  title: "Chilled Damage",
  nodeId: "chilled-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
