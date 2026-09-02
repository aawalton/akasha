import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaUnarmed = {
  id: "01a05fcc-d88a-7ec9-9b53-c2801b9e9c09",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-unarmed",
  title: "Ha Unarmed",
  nodeId: "ha-unarmed",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-ha-damage",
} as const satisfies TemperMetricTree
