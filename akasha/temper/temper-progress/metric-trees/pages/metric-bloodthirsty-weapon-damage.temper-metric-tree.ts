import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBloodthirstyWeaponDamage = {
  id: "019e2fcd-59ed-7f91-96d7-165b6dc12c99",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bloodthirsty-weapon-damage",
  title: "Bloodthirsty Weapon Damage",
  nodeId: "bloodthirsty-weapon-damage",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
