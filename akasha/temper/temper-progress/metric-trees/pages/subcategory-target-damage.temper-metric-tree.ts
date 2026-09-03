import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryTargetDamage = {
  id: "019e2fcd-5a8c-74b7-8326-cdac36c56d6c",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-target-damage",
  title: "Damage",
  nodeId: "target-damage",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "category-target",
} as const satisfies TemperMetricTree
