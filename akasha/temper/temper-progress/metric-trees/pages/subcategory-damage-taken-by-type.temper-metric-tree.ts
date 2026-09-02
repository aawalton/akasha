import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageTakenByType = {
  id: "01a05fcc-d8b2-7252-a9a4-86cfe3b58cfe",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-taken-by-type",
  title: "Damage Taken by Type",
  nodeId: "damage-taken-by-type",
  nodeType: "subcategory",
  displayOrder: 6,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
