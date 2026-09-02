import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenFromArea = {
  id: "01a05fcc-d87c-7ace-84d2-25758ca2cc4a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-from-area",
  title: "Damage Taken From Area",
  nodeId: "damage-taken-from-area",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
