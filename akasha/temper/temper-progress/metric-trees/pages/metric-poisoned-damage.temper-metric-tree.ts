import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPoisonedDamage = {
  id: "01a05fcc-d89d-7937-9732-32639977342a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-poisoned-damage",
  title: "Poisoned Damage",
  nodeId: "poisoned-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
