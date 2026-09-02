import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPenetrationPhysical = {
  id: "01a05fcc-d89c-71ec-8bfb-49e916dfd39c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-penetration-physical",
  title: "Penetration Physical",
  nodeId: "penetration-physical",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-penetration",
} as const satisfies TemperMetricTree
