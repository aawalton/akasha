import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceFrost = {
  id: "01a05fcc-d89f-7947-9e5f-18615afdd867",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-frost",
  title: "Resistance Frost",
  nodeId: "resistance-frost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
