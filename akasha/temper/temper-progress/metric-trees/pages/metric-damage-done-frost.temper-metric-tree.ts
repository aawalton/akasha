import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneFrost = {
  id: "01a05fcc-d877-7468-b2fd-dae103721d06",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-frost",
  title: "Damage Done Frost",
  nodeId: "damage-done-frost",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
