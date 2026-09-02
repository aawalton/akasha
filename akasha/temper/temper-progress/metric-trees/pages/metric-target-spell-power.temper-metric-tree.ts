import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetSpellPower = {
  id: "01a05fcc-d8ad-7576-8b73-fba9166577bf",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-spell-power",
  title: "Target Spell Power",
  nodeId: "target-spell-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-target-power",
} as const satisfies TemperMetricTree
