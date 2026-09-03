import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetAttackBonus = {
  id: "019e2fcd-5a8d-7986-9559-503d062fecfb",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-attack-bonus",
  title: "Target Attack Bonus",
  nodeId: "target-attack-bonus",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
