import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceFlame = {
  id: "01a05fcc-d89f-744c-aa02-91cd446597e5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-flame",
  title: "Resistance Flame",
  nodeId: "resistance-flame",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
