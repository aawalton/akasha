import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonusWeapon = {
  id: "019e2fcd-5a66-73f0-8281-2878832a4779",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus-weapon",
  title: "Healing Critical Bonus Weapon",
  nodeId: "healing-critical-bonus-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
