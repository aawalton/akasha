import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneBow = {
  id: "01a05fcc-d875-779f-88d3-197318c650cf",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-bow",
  title: "Damage Done Bow",
  nodeId: "damage-done-bow",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
