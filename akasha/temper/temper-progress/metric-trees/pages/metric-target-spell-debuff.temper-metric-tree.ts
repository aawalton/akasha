import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetSpellDebuff = {
  id: "01a05fcc-d8ad-7c0b-8f94-dfcf622c4a5e",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-spell-debuff",
  title: "Target Spell Debuff",
  nodeId: "target-spell-debuff",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
