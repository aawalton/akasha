import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryTargetHealing = {
  id: "01a05fcc-d8b8-71e0-ab1b-a13aceaf4816",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-target-healing",
  title: "Healing",
  nodeId: "target-healing",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-target",
} as const satisfies TemperMetricTree
