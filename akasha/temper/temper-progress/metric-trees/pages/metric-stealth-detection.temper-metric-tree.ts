import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStealthDetection = {
  id: "01a05fcc-d8a6-73ba-915d-c0c2e0f2cfc3",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stealth-detection",
  title: "Stealth Detection",
  nodeId: "stealth-detection",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-stealth",
} as const satisfies TemperMetricTree
