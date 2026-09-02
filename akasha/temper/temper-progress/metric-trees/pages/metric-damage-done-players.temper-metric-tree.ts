import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePlayers = {
  id: "01a05fcc-d879-7ab3-9b8d-2ee88ebc08e3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-players",
  title: "Damage Done Players",
  nodeId: "damage-done-players",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
