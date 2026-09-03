import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricConcussionDamage = {
  id: "019e2fcd-59d3-7541-84b0-55fc86ab93c4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-concussion-damage",
  title: "Concussion Damage",
  nodeId: "concussion-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
