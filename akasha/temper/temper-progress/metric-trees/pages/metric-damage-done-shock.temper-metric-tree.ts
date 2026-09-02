import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneShock = {
  id: "01a05fcc-d879-7409-845f-2a81588befd9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-shock",
  title: "Damage Done Shock",
  nodeId: "damage-done-shock",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
