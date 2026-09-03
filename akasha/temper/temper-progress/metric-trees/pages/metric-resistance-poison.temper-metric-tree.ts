import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistancePoison = {
  id: "019e2fcd-5a26-78bc-b4fd-845eb09f7e43",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-poison",
  title: "Resistance Poison",
  nodeId: "resistance-poison",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance-physical",
} as const satisfies TemperMetricTree
