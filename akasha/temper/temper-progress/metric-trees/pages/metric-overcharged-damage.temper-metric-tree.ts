import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricOverchargedDamage = {
  id: "01a05fcc-d89b-7f87-a270-bc39d05d52f8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-overcharged-damage",
  title: "Overcharged Damage",
  nodeId: "overcharged-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
