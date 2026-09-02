import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryDamageDone = {
  id: "01a05fcc-d8b1-71c8-9e25-8710386ccddb",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-damage-done",
  title: "Damage Done",
  nodeId: "damage-done",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-damage",
} as const satisfies TemperMetricTree
