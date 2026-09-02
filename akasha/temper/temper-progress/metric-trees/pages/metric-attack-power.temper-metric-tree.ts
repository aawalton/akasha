import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackPower = {
  id: "01a05fcc-d86e-7d0d-9047-9704ac06adec",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-power",
  title: "Attack Power",
  nodeId: "attack-power",
  nodeType: "metric",
  displayOrder: 2,
  parent: "category-damage",
} as const satisfies TemperMetricTree
