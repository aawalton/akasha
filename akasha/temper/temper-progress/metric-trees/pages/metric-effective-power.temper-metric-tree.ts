import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectivePower = {
  id: "01a05fcc-d881-7b53-ac94-55a6b21d2621",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-power",
  title: "Effective Power",
  nodeId: "effective-power",
  nodeType: "metric",
  displayOrder: 0,
  parent: "category-damage",
  useAccentColor: true,
} as const satisfies TemperMetricTree
