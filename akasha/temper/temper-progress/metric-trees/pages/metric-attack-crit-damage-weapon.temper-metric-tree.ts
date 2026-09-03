import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackCritDamageWeapon = {
  id: "019e2fcd-5978-7004-a66b-237dda18d388",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-crit-damage-weapon",
  title: "Attack Crit Damage Weapon",
  nodeId: "attack-crit-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-critical-damage",
} as const satisfies TemperMetricTree
