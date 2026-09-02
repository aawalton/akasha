import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaMagicSpellDamage = {
  id: "01a05fcc-d884-72a9-89e0-d70aac7a4614",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-magic-spell-damage",
  title: "Ha Magic Spell Damage",
  nodeId: "ha-magic-spell-damage",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
