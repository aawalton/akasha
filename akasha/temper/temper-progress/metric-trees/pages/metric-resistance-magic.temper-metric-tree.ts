import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceMagic = {
  id: "01a05fcc-d8a0-7508-93e8-d3e7aff2be40",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-magic",
  title: "Resistance Magic",
  nodeId: "resistance-magic",
  nodeType: "metric",
  displayOrder: 3,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
