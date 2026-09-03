import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceBleed = {
  id: "019e2fcd-5a24-71d5-b658-29d4b2ed8031",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-bleed",
  title: "Resistance Bleed",
  nodeId: "resistance-bleed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
