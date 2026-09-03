import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBurningDamage = {
  id: "019e2fcd-59d1-72f8-86dc-0707ff81b11a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-burning-damage",
  title: "Burning Damage",
  nodeId: "burning-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
