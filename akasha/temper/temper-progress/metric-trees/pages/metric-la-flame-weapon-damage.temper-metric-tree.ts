import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaFlameWeaponDamage = {
  id: "01a05fcc-d890-7b47-a9b7-77f0aebb7f20",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-flame-weapon-damage",
  title: "La Flame Weapon Damage",
  nodeId: "la-flame-weapon-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
