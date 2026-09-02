import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneSingleTarget = {
  id: "01a05fcc-d879-70bf-8c4a-ea427fda287a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-single-target",
  title: "Damage Done Single Target",
  nodeId: "damage-done-single-target",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
