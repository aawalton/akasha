import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetCriticalDamageDone = {
  id: "01a05fcc-d8a8-74aa-8cc0-74fa5b8a565a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-critical-damage-done",
  title: "Target Critical Damage Done",
  nodeId: "target-critical-damage-done",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-target-damage",
} as const satisfies TemperMetricTree
