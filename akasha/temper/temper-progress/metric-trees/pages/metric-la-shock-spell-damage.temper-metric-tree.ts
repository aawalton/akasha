import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaShockSpellDamage = {
  id: "01a05fcc-d893-76d6-acfd-029a5c7ad338",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-shock-spell-damage",
  title: "La Shock Spell Damage",
  nodeId: "la-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
