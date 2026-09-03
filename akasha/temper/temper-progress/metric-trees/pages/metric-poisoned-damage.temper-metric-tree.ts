import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPoisonedDamage = {
  id: "019e2fcd-59d7-795c-9656-9218565d6c18",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-poisoned-damage",
  title: "Poisoned Damage",
  nodeId: "poisoned-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-status-damage",
} as const satisfies TemperMetricTree
