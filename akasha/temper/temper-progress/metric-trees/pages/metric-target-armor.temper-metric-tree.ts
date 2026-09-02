import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetArmor = {
  id: "01a05fcc-d8a7-7a83-838c-e7cfa2679314",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-armor",
  title: "Target Armor",
  nodeId: "target-armor",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
