import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaPhysicalWeaponDamage = {
  id: "019e2fcd-59b3-7e23-827a-d4a634842390",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-physical-weapon-damage",
  title: "Ha Physical Weapon Damage",
  nodeId: "ha-physical-weapon-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
