import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricOverloadDamage = {
  id: "01a05fcc-d89b-7dc2-af13-e846ff8bd121",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-overload-damage",
  title: "Overload Damage",
  nodeId: "overload-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-light-attacks",
} as const satisfies TemperMetricTree
