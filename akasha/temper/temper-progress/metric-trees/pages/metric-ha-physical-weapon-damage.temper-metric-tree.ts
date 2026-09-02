import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaPhysicalWeaponDamage = {
  id: "01a05fcc-d885-70bc-9363-afeed34b6987",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-physical-weapon-damage",
  title: "Ha Physical Weapon Damage",
  nodeId: "ha-physical-weapon-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
