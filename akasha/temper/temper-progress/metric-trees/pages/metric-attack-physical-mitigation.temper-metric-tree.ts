import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricAttackPhysicalMitigation = {
  id: "01a05fcc-d86d-7885-aa16-eb83e42c4634",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-attack-physical-mitigation",
  title: "Attack Physical Mitigation",
  nodeId: "attack-physical-mitigation",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-mitigation",
} as const satisfies TemperMetricTree
