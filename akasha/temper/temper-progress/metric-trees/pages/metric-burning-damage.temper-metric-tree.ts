import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBurningDamage = {
  id: "01a05fcc-d871-72cb-a3c4-b1fd06924c5c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-burning-damage",
  title: "Burning Damage",
  nodeId: "burning-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
