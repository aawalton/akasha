import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetAttackBonus = {
  id: "01a05fcc-d8a7-7510-a6cb-80d43274f21b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-attack-bonus",
  title: "Target Attack Bonus",
  nodeId: "target-attack-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
