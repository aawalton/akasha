import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDefenseBonus = {
  id: "01a05fcc-d8aa-7690-9597-e4e9d49b8ec2",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-defense-bonus",
  title: "Target Defense Bonus",
  nodeId: "target-defense-bonus",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
