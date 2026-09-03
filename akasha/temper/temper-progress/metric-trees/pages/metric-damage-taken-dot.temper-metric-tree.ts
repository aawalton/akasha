import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDot = {
  id: "019e2fcd-5a3c-7bab-8eda-dee5cefa863d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-dot",
  title: "Damage Taken Dot",
  nodeId: "damage-taken-dot",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
