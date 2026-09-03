import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHealingDoneBase = {
  id: "019e2fcd-5a54-7f9e-98cf-02b56dd1efcc",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-healing-done-base",
  title: "Healing Done Base",
  nodeId: "healing-done-base",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-healing-done",
} as const satisfies TemperMetricTree
