import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPenetrationSpell = {
  id: "01a05fcc-d89c-7978-9223-e124cdd62691",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-penetration-spell",
  title: "Penetration Spell",
  nodeId: "penetration-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-penetration",
} as const satisfies TemperMetricTree
