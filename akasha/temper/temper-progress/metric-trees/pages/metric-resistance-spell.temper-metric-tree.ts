import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceSpell = {
  id: "01a05fcc-d8a1-721e-b491-20f6afe1f358",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-spell",
  title: "Resistance Spell",
  nodeId: "resistance-spell",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
