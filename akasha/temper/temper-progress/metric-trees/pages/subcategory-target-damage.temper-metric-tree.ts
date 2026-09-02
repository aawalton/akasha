import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryTargetDamage = {
  id: "01a05fcc-d8b8-7fe0-987f-0de5377a8fb1",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-target-damage",
  title: "Damage",
  nodeId: "target-damage",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "category-target",
} as const satisfies TemperMetricTree
