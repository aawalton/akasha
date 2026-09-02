import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneDisease = {
  id: "01a05fcc-d876-7caf-9493-2dda7dcc3579",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-disease",
  title: "Damage Done Disease",
  nodeId: "damage-done-disease",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
