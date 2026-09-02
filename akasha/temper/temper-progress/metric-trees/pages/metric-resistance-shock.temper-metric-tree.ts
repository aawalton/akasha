import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceShock = {
  id: "01a05fcc-d8a1-78a7-8210-61799eeb2767",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-shock",
  title: "Resistance Shock",
  nodeId: "resistance-shock",
  nodeType: "metric",
  displayOrder: 5,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
