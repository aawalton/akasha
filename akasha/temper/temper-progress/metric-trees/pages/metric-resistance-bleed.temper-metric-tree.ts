import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceBleed = {
  id: "01a05fcc-d89e-7dff-8340-b16711874dbb",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-bleed",
  title: "Resistance Bleed",
  nodeId: "resistance-bleed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
