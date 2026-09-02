import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPotionDuration = {
  id: "01a05fcc-d89d-7597-8d6e-d713ac8092b4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-potion-duration",
  title: "Potion Duration",
  nodeId: "potion-duration",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-potions",
} as const satisfies TemperMetricTree
