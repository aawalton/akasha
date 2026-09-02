import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryMitigation = {
  id: "01a05fcc-d8b7-79fa-8223-16a97f1e8910",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-mitigation",
  title: "Mitigation",
  nodeId: "mitigation",
  nodeType: "subcategory",
  displayOrder: 11,
  parent: "category-damage",
} as const satisfies TemperMetricTree
