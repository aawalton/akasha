import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseSpellAoeMitigation = {
  id: "01a05fcc-d87e-719a-91ad-841e4723af3a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-spell-aoe-mitigation",
  title: "Defense Spell Aoe Mitigation",
  nodeId: "defense-spell-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 4,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
