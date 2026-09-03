import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistancePhysical = {
  id: "019e2fcd-5a22-7eca-b412-e966c5ab0a2b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-physical",
  title: "Resistance Physical",
  nodeId: "resistance-physical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
