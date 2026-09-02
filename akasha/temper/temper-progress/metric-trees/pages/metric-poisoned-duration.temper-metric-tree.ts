import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPoisonedDuration = {
  id: "01a05fcc-d89d-707f-8240-c1233f07ca0e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-poisoned-duration",
  title: "Poisoned Duration",
  nodeId: "poisoned-duration",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-status-effects",
} as const satisfies TemperMetricTree
