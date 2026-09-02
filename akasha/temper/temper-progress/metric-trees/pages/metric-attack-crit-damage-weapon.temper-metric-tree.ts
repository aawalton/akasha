import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackCritDamageWeapon = {
  id: "01a05fcc-d86d-77ed-b811-0c22e5ce1ae1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-crit-damage-weapon",
  title: "Attack Crit Damage Weapon",
  nodeId: "attack-crit-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-critical-damage",
} as const satisfies TemperMetricTree
