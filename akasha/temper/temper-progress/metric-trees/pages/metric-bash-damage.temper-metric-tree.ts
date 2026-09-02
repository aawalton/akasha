import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBashDamage = {
  id: "01a05fcc-d86e-76bf-81d3-be55861dd9ed",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bash-damage",
  title: "Bash Damage",
  nodeId: "bash-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "category-damage",
} as const satisfies TemperMetricTree
