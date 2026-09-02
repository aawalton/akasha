import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealthAbilityCost = {
  id: "01a05fcc-d88d-7d68-a6ad-ef6c88ff9e06",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-health-ability-cost",
  title: "Health Ability Cost",
  nodeId: "health-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-costs",
} as const satisfies TemperMetricTree
