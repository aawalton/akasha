import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingReceived = {
  id: "019e2fcd-5a67-7725-9769-87c2f25acd33",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-received",
  title: "Healing Received",
  nodeId: "healing-received",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-healing",
} as const satisfies TemperMetricTree
