import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaShockSpellDamage = {
  id: "01a05fcc-d888-73d6-bb1b-19d4263ea071",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-shock-spell-damage",
  title: "Ha Shock Spell Damage",
  nodeId: "ha-shock-spell-damage",
  nodeType: "metric",
  displayOrder: 8,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
