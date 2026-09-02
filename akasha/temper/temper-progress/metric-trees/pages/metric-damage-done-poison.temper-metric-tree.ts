import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePoison = {
  id: "01a05fcc-d879-7cb7-bccb-cb9eff36e35a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-poison",
  title: "Damage Done Poison",
  nodeId: "damage-done-poison",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
