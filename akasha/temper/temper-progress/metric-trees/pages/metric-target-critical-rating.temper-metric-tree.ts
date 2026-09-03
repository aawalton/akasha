import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalRating = {
  id: "019e2fcd-5a91-74a5-b3d2-40862f79e60d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-rating",
  title: "Target Critical Rating",
  nodeId: "target-critical-rating",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
