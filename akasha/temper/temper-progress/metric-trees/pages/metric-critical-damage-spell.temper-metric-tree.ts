import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageSpell = {
  id: "01a05fcc-d872-701f-9372-bf9d59add3f2",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-spell",
  title: "Critical Damage Spell",
  nodeId: "critical-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-critical-damage",
} as const satisfies TemperMetricTree
