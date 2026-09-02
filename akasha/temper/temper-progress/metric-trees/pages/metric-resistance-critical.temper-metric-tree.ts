import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceCritical = {
  id: "01a05fcc-d89e-782d-990b-d177d6c5cfb3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-critical",
  title: "Resistance Critical",
  nodeId: "resistance-critical",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-critical-defense",
} as const satisfies TemperMetricTree
