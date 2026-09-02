import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseCritDmg = {
  id: "01a05fcc-d87d-7a88-8d82-24aecface261",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-crit-dmg",
  title: "Defense Crit Dmg",
  nodeId: "defense-crit-dmg",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
