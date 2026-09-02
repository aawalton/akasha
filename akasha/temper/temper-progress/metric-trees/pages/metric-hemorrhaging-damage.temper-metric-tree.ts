import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHemorrhagingDamage = {
  id: "01a05fcc-d88f-75f5-b971-fba6b2765dff",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-hemorrhaging-damage",
  title: "Hemorrhaging Damage",
  nodeId: "hemorrhaging-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
