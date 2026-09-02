import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaFrostSpellDamage = {
  id: "01a05fcc-d890-7bed-aabb-9456774179d0",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-frost-spell-damage",
  title: "La Frost Spell Damage",
  nodeId: "la-frost-spell-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
