import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaAbilityCost = {
  id: "01a05fcc-d8a3-7490-a4b3-e5f8c23e9e71",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-ability-cost",
  title: "Stamina Ability Cost",
  nodeId: "stamina-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
