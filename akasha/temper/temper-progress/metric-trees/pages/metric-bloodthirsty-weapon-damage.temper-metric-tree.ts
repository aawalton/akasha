import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBloodthirstyWeaponDamage = {
  id: "01a05fcc-d870-758c-b95d-e6669445c35f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bloodthirsty-weapon-damage",
  title: "Bloodthirsty Weapon Damage",
  nodeId: "bloodthirsty-weapon-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
