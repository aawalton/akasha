import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetSpellResistance = {
  id: "01a05fcc-d8ae-7606-9565-404e03855972",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-spell-resistance",
  title: "Target Spell Resistance",
  nodeId: "target-spell-resistance",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-target-resistance",
} as const satisfies TemperMetricTree
