import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDamageDone = {
  id: "01a05fcc-d8a9-7cac-9219-7ef710fc068b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-damage-done",
  title: "Target Damage Done",
  nodeId: "target-damage-done",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
