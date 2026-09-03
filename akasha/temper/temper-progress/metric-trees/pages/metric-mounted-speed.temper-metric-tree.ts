import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMountedSpeed = {
  id: "019e2fcd-5a7d-77e7-8d1c-7ab9abf38c1a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-mounted-speed",
  title: "Mounted Speed",
  nodeId: "mounted-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "category-mobility",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
