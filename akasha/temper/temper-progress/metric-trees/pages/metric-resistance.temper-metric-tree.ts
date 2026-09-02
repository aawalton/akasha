import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistance = {
  id: "01a05fcc-d8a2-7b22-bab6-ed2fa77067a9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance",
  title: "Resistance",
  nodeId: "resistance",
  nodeType: "metric",
  displayOrder: 3,
  parent: "category-toughness",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
