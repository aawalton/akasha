import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricConcussionDamage = {
  id: "01a05fcc-d872-7928-b288-91ce8618d85b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-concussion-damage",
  title: "Concussion Damage",
  nodeId: "concussion-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
