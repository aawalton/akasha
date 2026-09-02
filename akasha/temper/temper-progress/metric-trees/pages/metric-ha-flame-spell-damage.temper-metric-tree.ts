import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFlameSpellDamage = {
  id: "01a05fcc-d882-7c20-aa49-24f5b3d5ca97",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-flame-spell-damage",
  title: "Ha Flame Spell Damage",
  nodeId: "ha-flame-spell-damage",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
