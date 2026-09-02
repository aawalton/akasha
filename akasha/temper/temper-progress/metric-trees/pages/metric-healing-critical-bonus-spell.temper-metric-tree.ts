import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingCriticalBonusSpell = {
  id: "01a05fcc-d88a-75b3-b434-cf6a27544a2e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-critical-bonus-spell",
  title: "Healing Critical Bonus Spell",
  nodeId: "healing-critical-bonus-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-healing-critical-bonus",
} as const satisfies TemperMetricTree
