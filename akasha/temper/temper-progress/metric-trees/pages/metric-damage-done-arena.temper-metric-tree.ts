import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneArena = {
  id: "01a05fcc-d874-74d3-a21d-e26b9212be19",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-arena",
  title: "Damage Done Arena",
  nodeId: "damage-done-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
