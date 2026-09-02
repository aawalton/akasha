import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneHeavyAttack = {
  id: "01a05fcc-d877-7030-ba06-616867429234",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-heavy-attack",
  title: "Damage Done Heavy Attack",
  nodeId: "damage-done-heavy-attack",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
