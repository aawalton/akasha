import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricStaminaNonCoreAbilityCost = {
  id: "01a05fcc-d8a4-78c6-aff9-c49328a5acb8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-stamina-non-core-ability-cost",
  title: "Stamina Non Core Ability Cost",
  nodeId: "stamina-non-core-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-stamina",
} as const satisfies TemperMetricTree
