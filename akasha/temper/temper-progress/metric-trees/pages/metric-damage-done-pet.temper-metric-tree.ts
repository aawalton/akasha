import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePet = {
  id: "01a05fcc-d878-7ec6-bb87-03eedb6bbd0e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-pet",
  title: "Damage Done Pet",
  nodeId: "damage-done-pet",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
