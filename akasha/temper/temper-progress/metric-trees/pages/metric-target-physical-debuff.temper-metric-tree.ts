import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetPhysicalDebuff = {
  id: "01a05fcc-d8ac-7ad5-a1f4-ec397f5c9f34",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-physical-debuff",
  title: "Target Physical Debuff",
  nodeId: "target-physical-debuff",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
