import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneFlame = {
  id: "01a05fcc-d877-7ed3-98f4-f1baf803662c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-flame",
  title: "Damage Done Flame",
  nodeId: "damage-done-flame",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
