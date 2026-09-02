import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneBase = {
  id: "01a05fcc-d875-7eda-853e-6c01aff317e0",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-base",
  title: "Damage Done Base",
  nodeId: "damage-done-base",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
