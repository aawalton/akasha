import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneSingleTarget = {
  id: "01a05fcc-d88c-72e6-be8a-0c831fc63db5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-single-target",
  title: "Healing Done Single Target",
  nodeId: "healing-done-single-target",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
