import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryCriticalDamage = {
  id: "01a05fcc-d8b1-7b1c-9472-fa3f2794b382",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-critical-damage",
  title: "Critical",
  nodeId: "critical-damage",
  nodeType: "subcategory",
  displayOrder: 4,
  parent: "category-damage",
} as const satisfies TemperMetricTree
