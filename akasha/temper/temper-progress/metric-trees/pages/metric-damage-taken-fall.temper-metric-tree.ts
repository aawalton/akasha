import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenFall = {
  id: "01a05fcc-d87b-7391-bab9-bd1170773517",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-fall",
  title: "Damage Taken Fall",
  nodeId: "damage-taken-fall",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
