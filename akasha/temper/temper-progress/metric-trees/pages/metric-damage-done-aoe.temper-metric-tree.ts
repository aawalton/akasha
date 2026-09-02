import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneAoe = {
  id: "01a05fcc-d874-7d7b-8ac2-74954125d77e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-aoe",
  title: "Damage Done Aoe",
  nodeId: "damage-done-aoe",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
