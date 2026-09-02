import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaFrostWeaponDamage = {
  id: "01a05fcc-d884-799d-a40b-867cf1796c51",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-frost-weapon-damage",
  title: "Ha Frost Weapon Damage",
  nodeId: "ha-frost-weapon-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
