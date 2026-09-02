import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalRating = {
  id: "01a05fcc-d8a9-7f60-a744-f0ef696b0d89",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-rating",
  title: "Target Critical Rating",
  nodeId: "target-critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
