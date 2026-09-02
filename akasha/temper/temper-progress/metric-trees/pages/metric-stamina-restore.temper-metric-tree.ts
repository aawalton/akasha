import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaRestore = {
  id: "01a05fcc-d8a5-7b11-aa06-a4727c3445df",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-restore",
  title: "Stamina Restore",
  nodeId: "stamina-restore",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
