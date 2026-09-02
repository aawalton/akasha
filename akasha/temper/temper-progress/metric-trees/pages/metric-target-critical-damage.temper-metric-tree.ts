import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalDamage = {
  id: "01a05fcc-d8a9-7392-a46e-8bf10cde7746",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-damage",
  title: "Target Critical Damage",
  nodeId: "target-critical-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
