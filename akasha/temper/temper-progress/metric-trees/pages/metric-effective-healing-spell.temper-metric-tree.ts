import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectiveHealingSpell = {
  id: "01a05fcc-d87f-70ed-8c3c-bc889de711b5",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-healing-spell",
  title: "Effective Healing Spell",
  nodeId: "effective-healing-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-effective-healing",
} as const satisfies TemperMetricTree
