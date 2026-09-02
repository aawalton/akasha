import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaShockWeaponDamage = {
  id: "01a05fcc-d889-72ee-94fc-8479313e87b8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-shock-weapon-damage",
  title: "Ha Shock Weapon Damage",
  nodeId: "ha-shock-weapon-damage",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-ha-power",
} as const satisfies TemperMetricTree
