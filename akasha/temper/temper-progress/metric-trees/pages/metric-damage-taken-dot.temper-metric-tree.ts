import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDot = {
  id: "01a05fcc-d87b-7080-9fa6-5db0ed6706a4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-dot",
  title: "Damage Taken Dot",
  nodeId: "damage-taken-dot",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
