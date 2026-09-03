import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceFrost = {
  id: "019e2fcd-5a2b-735c-8b08-782fdcab955d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-frost",
  title: "Resistance Frost",
  nodeId: "resistance-frost",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance-spell",
} as const satisfies TemperMetricTree
