import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonusWeapon = {
  id: "01a05fcc-d88b-7ccc-ab37-2e9cdd3100a8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus-weapon",
  title: "Healing Critical Bonus Weapon",
  nodeId: "healing-critical-bonus-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
