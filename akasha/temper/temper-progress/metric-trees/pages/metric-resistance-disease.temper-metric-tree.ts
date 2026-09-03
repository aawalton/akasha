import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceDisease = {
  id: "019e2fcd-5a25-7456-9671-6e8eb5339a1a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-disease",
  title: "Resistance Disease",
  nodeId: "resistance-disease",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
