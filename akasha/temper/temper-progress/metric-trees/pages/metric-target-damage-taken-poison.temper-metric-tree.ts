import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDamageTakenPoison = {
  id: "01a05fcc-d8aa-7f68-ae0a-0913193bd62f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-damage-taken-poison",
  title: "Target Damage Taken Poison",
  nodeId: "target-damage-taken-poison",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
