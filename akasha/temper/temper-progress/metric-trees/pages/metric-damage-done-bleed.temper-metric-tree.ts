import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneBleed = {
  id: "01a05fcc-d875-7ace-9683-5528542d0f8a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-bleed",
  title: "Damage Done Bleed",
  nodeId: "damage-done-bleed",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
