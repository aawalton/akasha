import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFlameWeaponDamage = {
  id: "01a05fcc-d883-75d1-b274-1207ec2d3567",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-flame-weapon-damage",
  title: "Ha Flame Weapon Damage",
  nodeId: "ha-flame-weapon-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
