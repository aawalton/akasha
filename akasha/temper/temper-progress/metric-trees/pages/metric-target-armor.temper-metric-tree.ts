import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetArmor = {
  id: "019e2fcd-5a9e-7f67-bda5-5d03038b7458",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-armor",
  title: "Target Armor",
  nodeId: "target-armor",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
