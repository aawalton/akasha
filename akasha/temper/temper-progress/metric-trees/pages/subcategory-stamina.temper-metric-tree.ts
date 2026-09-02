import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryStamina = {
  id: "01a05fcc-d8b7-7567-bc87-8a429af8063c",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-stamina",
  title: "Stamina",
  nodeId: "stamina",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "category-sustain",
} as const satisfies TemperMetricTree
