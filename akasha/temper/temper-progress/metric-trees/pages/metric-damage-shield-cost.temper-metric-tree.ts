import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageShieldCost = {
  id: "01a05fcc-d87a-7215-a4b9-1c1ba87e7c98",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-shield-cost",
  title: "Damage Shield Cost",
  nodeId: "damage-shield-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-shields",
} as const satisfies TemperMetricTree
