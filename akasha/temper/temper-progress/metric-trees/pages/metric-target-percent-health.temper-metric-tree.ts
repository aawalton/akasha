import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPercentHealth = {
  id: "01a05fcc-d8ac-772c-83cc-21f214846e04",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-percent-health",
  title: "Target Percent Health",
  nodeId: "target-percent-health",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-other",
} as const satisfies TemperMetricTree
