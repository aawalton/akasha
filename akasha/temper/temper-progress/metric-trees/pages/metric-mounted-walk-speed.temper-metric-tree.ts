import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMountedWalkSpeed = {
  id: "01a05fcc-d899-7ed2-9658-b0262b50f0d9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-mounted-walk-speed",
  title: "Mounted Walk Speed",
  nodeId: "mounted-walk-speed",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-mounted-speed",
} as const satisfies TemperMetricTree
