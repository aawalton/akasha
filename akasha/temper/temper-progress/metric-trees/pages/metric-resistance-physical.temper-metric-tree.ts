import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistancePhysical = {
  id: "01a05fcc-d8a1-799c-a67f-cdce11a09804",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-physical",
  title: "Resistance Physical",
  nodeId: "resistance-physical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
