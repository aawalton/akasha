import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageShields = {
  id: "01a05fcc-d8b2-7e54-8e7a-e1c610cd5915",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-shields",
  title: "Damage Shields",
  nodeId: "damage-shields",
  nodeType: "subcategory",
  displayOrder: 8,
  parent: "category-toughness",
} as const satisfies TemperMetricTree
