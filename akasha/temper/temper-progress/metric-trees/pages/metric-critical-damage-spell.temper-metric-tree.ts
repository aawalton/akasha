import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalDamageSpell = {
  id: "019e2fcd-597a-70c8-9fbb-f4969e37d3ee",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-damage-spell",
  title: "Critical Damage Spell",
  nodeId: "critical-damage-spell",
  nodeType: "metric",
  displayOrder: 0,
  parent: "metric-critical-damage",
} as const satisfies TemperMetricTree
