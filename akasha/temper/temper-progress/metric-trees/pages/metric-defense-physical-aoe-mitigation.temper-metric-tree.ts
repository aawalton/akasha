import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDefensePhysicalAoeMitigation = {
  id: "01a05fcc-d87d-7a16-a310-9a2bd84f5df4",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-defense-physical-aoe-mitigation",
  title: "Defense Physical Aoe Mitigation",
  nodeId: "defense-physical-aoe-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-defense-mitigation",
} as const satisfies TemperMetricTree
