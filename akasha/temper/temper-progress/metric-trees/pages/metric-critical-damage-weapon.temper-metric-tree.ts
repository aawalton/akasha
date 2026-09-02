import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageWeapon = {
  id: "01a05fcc-d873-752e-babb-99de13137100",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-weapon",
  title: "Critical Damage Weapon",
  nodeId: "critical-damage-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-critical-damage",
} as const satisfies TemperMetricTree
