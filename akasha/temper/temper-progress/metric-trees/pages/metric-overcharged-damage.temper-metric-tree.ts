import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricOverchargedDamage = {
  id: "019e2fcd-59d6-7849-b439-b65ed0480415",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-overcharged-damage",
  title: "Overcharged Damage",
  nodeId: "overcharged-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
