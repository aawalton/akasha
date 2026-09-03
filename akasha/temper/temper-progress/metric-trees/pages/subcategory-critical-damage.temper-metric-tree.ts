import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryCriticalDamage = {
  id: "019e2fcd-5976-70f3-94fb-5f09d4b0813c",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-critical-damage",
  title: "Critical",
  nodeId: "critical-damage",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "category-damage",
} as const satisfies TemperMetricTree
