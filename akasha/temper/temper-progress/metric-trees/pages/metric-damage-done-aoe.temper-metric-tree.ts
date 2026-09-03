import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneAoe = {
  id: "019e2fcd-596a-7e00-b8f7-8593a2e0396e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-aoe",
  title: "Damage Done Aoe",
  nodeId: "damage-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
