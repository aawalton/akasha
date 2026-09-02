import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDirect = {
  id: "01a05fcc-d87b-78ae-aa5d-7b5af771ae7c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-direct",
  title: "Damage Taken Direct",
  nodeId: "damage-taken-direct",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
