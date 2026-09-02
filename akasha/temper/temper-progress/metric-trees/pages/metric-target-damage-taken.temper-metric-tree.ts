import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetDamageTaken = {
  id: "01a05fcc-d8aa-713b-8666-edab74fa28c7",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-damage-taken",
  title: "Target Damage Taken",
  nodeId: "target-damage-taken",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-target-toughness",
} as const satisfies TemperMetricTree
