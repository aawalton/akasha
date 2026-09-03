import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPenetrationSpell = {
  id: "019e2fcd-5980-7fed-8900-a1a6813d6e9f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-penetration-spell",
  title: "Penetration Spell",
  nodeId: "penetration-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-penetration",
} as const satisfies TemperMetricTree
