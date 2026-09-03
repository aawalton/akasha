import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDonePlayers = {
  id: "019e2fcd-5973-707a-9fe0-baf9778f6ebe",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-players",
  title: "Damage Done Players",
  nodeId: "damage-done-players",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
