import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFrostSpellDamage = {
  id: "01a05fcc-d883-73ff-a0ee-0a82686c641d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-frost-spell-damage",
  title: "Ha Frost Spell Damage",
  nodeId: "ha-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
