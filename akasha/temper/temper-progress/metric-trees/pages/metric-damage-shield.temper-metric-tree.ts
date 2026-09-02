import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageShield = {
  id: "01a05fcc-d87a-74f5-a5a8-9c9f136c07ca",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-shield",
  title: "Damage Shield",
  nodeId: "damage-shield",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-shields",
} as const satisfies TemperMetricTree
