import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackSpellMitigation = {
  id: "01a05fcc-d86e-70a1-a34f-81a0edb4c501",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-spell-mitigation",
  title: "Attack Spell Mitigation",
  nodeId: "attack-spell-mitigation",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-mitigation",
} as const satisfies TemperMetricTree
