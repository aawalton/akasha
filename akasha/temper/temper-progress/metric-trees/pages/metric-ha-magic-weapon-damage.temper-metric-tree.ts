import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaMagicWeaponDamage = {
  id: "01a05fcc-d884-78c8-a30d-4919a557c9ac",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-magic-weapon-damage",
  title: "Ha Magic Weapon Damage",
  nodeId: "ha-magic-weapon-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
