import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaPhysicalSpellDamage = {
  id: "01a05fcc-d885-757b-ac9e-e50dc9651c98",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-physical-spell-damage",
  title: "Ha Physical Spell Damage",
  nodeId: "ha-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
