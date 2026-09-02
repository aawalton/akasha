import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageTaken = {
  id: "01a05fcc-d8b2-75ff-b254-761ceab87703",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-taken",
  title: "Damage Taken",
  nodeId: "damage-taken",
  nodeType: "subcategory",
  displayOrder: 5,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
