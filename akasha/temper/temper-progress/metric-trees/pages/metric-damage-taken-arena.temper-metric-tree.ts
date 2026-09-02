import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenArena = {
  id: "01a05fcc-d87a-7244-a5a9-81b0c24f5db8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-arena",
  title: "Damage Taken Arena",
  nodeId: "damage-taken-arena",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
