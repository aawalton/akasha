import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaMagicWeaponDamage = {
  id: "01a05fcc-d891-7195-8037-071aec441712",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-magic-weapon-damage",
  title: "La Magic Weapon Damage",
  nodeId: "la-magic-weapon-damage",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
