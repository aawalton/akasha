import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistancePoison = {
  id: "01a05fcc-d8a1-71ab-996b-499706390b7a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-poison",
  title: "Resistance Poison",
  nodeId: "resistance-poison",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
