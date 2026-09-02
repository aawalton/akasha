import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseSpellMitigation = {
  id: "01a05fcc-d87f-73e9-833c-60e87b140137",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-spell-mitigation",
  title: "Defense Spell Mitigation",
  nodeId: "defense-spell-mitigation",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
