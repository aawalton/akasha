import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPhysicalResistance = {
  id: "01a05fcc-d8ac-7698-a6fa-0a7ae96a32dd",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-physical-resistance",
  title: "Target Physical Resistance",
  nodeId: "target-physical-resistance",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-target-resistance",
} as const satisfies TemperMetricTree
