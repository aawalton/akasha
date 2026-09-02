import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaFrostWeaponDamage = {
  id: "01a05fcc-d891-74bd-9e95-9c750a9ce31d",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-frost-weapon-damage",
  title: "La Frost Weapon Damage",
  nodeId: "la-frost-weapon-damage",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
