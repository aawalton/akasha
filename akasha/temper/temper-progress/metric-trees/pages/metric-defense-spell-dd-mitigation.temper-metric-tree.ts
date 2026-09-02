import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefenseSpellDdMitigation = {
  id: "01a05fcc-d87e-7919-bf24-0c74c7f20f86",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-spell-dd-mitigation",
  title: "Defense Spell Dd Mitigation",
  nodeId: "defense-spell-dd-mitigation",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
