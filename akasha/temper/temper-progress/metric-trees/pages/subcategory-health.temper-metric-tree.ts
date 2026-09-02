import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealth = {
  id: "01a05fcc-d8b5-7a17-ad34-96285870fbab",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-health",
  title: "Health",
  nodeId: "health",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
