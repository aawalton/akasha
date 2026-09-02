import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageDoneByType = {
  id: "01a05fcc-d8b1-751f-9c96-14382c340168",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-done-by-type",
  title: "Damage Done by Type",
  nodeId: "damage-done-by-type",
  nodeType: "subcategory",
  displayOrder: 7,
  parent: "category-damage",
} as const satisfies TemperMetricTree
