import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaSpeed = {
  id: "01a05fcc-d889-7dbb-959a-63c871c14586",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-speed",
  title: "Ha Speed",
  nodeId: "ha-speed",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
