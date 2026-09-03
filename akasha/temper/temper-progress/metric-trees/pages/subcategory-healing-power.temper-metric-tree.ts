import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingPower = {
  id: "019e2fcd-5a59-7ccc-b941-ee389e254bf0",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-power",
  title: "Healing Power",
  nodeId: "healing-power",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "category-healing",
} as const satisfies TemperMetricTree
