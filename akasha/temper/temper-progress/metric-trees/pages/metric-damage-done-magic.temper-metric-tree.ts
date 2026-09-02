import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneMagic = {
  id: "01a05fcc-d878-708d-b152-fd388eab826b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-magic",
  title: "Damage Done Magic",
  nodeId: "damage-done-magic",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
