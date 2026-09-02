import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenTrial = {
  id: "01a05fcc-d87d-7fca-994e-9e0941841ed4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-trial",
  title: "Damage Taken Trial",
  nodeId: "damage-taken-trial",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
