import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneDirect = {
  id: "01a05fcc-d876-7c0d-8ab4-2783f44d1e93",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-direct",
  title: "Damage Done Direct",
  nodeId: "damage-done-direct",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
