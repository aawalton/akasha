import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaMeleeSpeed = {
  id: "01a05fcc-d892-70ef-af81-7a5e59add0dd",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-melee-speed",
  title: "La Melee Speed",
  nodeId: "la-melee-speed",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-light-attacks",
} as const satisfies TemperMetricTree
