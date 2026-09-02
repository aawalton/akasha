import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectiveHealingWeapon = {
  id: "01a05fcc-d880-7d73-8106-0743b816f70b",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-healing-weapon",
  title: "Effective Healing Weapon",
  nodeId: "effective-healing-weapon",
  nodeType: "metric",
  displayOrder: 2,
  parent: "subcategory-effective-healing",
} as const satisfies TemperMetricTree
