import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneTrial = {
  id: "01a05fcc-d87a-7e9a-8d83-258a8aa236a4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-trial",
  title: "Damage Done Trial",
  nodeId: "damage-done-trial",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
