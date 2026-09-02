import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricSunderedDamage = {
  id: "01a05fcc-d8a6-766f-9890-207ac6741cb6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-sundered-damage",
  title: "Sundered Damage",
  nodeId: "sundered-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
