import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryLaDamage = {
  id: "01a05fcc-d8b5-7d85-acfe-e8be06b30a01",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-la-damage",
  title: "LA Damage",
  nodeId: "la-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "subcategory-light-attacks",
} as const satisfies TemperMetricTree
