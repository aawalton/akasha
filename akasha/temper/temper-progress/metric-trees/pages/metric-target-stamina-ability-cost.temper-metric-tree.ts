import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetStaminaAbilityCost = {
  id: "01a05fcc-d8ae-7479-af8f-b6ac0054b68a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-stamina-ability-cost",
  title: "Target Stamina Ability Cost",
  nodeId: "target-stamina-ability-cost",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-target-sustain",
} as const satisfies TemperMetricTree
