import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricResistanceSpell = {
  id: "019e2fcd-5a27-7b25-bbf6-b8fbcbde819e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-resistance-spell",
  title: "Resistance Spell",
  nodeId: "resistance-spell",
  nodeType: "metric",
  displayOrder: 2,
  parent: "metric-resistance",
  includeInChildAggregates: true,
} as const satisfies TemperMetricTree
