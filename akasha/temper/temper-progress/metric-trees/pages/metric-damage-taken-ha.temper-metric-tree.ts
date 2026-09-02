import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenHa = {
  id: "01a05fcc-d87c-7888-a352-f63d8edf1fb4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-ha",
  title: "Damage Taken Ha",
  nodeId: "damage-taken-ha",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
