import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTaken = {
  id: "01a05fcc-d87c-775b-aea1-15b3db28ce52",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
