import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaPhysicalWeaponDamage = {
  id: "01a05fcc-d893-7a60-b890-0f033ff6a983",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-physical-weapon-damage",
  title: "La Physical Weapon Damage",
  nodeId: "la-physical-weapon-damage",
  nodeType: "metric",
  displayOrder: 7,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
