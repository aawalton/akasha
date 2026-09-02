import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMountedRunSpeed = {
  id: "01a05fcc-d898-726d-92bf-a0b53b610946",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-mounted-run-speed",
  title: "Mounted Run Speed",
  nodeId: "mounted-run-speed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-mounted-speed",
} as const satisfies TemperMetricTree
