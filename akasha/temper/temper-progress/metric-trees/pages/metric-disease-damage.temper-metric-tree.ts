import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDiseaseDamage = {
  id: "01a05fcc-d87f-743e-a5fb-36f13e5619bf",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-disease-damage",
  title: "Disease Damage",
  nodeId: "disease-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
