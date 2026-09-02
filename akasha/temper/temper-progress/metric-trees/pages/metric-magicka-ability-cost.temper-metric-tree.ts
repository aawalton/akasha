import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricMagickaAbilityCost = {
  id: "01a05fcc-d896-7ff5-b39a-ac533d051e5f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-magicka-ability-cost",
  title: "Magicka Ability Cost",
  nodeId: "magicka-ability-cost",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-magicka",
} as const satisfies TemperMetricTree
