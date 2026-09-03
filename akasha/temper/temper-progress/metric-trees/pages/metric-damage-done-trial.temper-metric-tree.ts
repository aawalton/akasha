import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneTrial = {
  id: "019e2fcd-5975-717b-aea1-f91f7f1bbe74",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-trial",
  title: "Damage Done Trial",
  nodeId: "damage-done-trial",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
