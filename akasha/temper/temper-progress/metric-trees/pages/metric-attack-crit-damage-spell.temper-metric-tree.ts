import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackCritDamageSpell = {
  id: "01a05fcc-d86d-7841-a09d-6bf2f9fdc497",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-crit-damage-spell",
  title: "Attack Crit Damage Spell",
  nodeId: "attack-crit-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-critical-damage",
} as const satisfies TemperMetricTree
