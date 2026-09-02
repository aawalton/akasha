import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPower = {
  id: "01a05fcc-d8ad-7b89-b3d5-c4de296b949f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-power",
  title: "Target Power",
  nodeId: "target-power",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-target-damage",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
