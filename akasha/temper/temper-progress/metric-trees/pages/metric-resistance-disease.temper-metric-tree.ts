import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceDisease = {
  id: "01a05fcc-d89f-792f-9e36-65293d795aca",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-disease",
  title: "Resistance Disease",
  nodeId: "resistance-disease",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
