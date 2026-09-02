import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryStatusDamage = {
  id: "01a05fcc-d8b8-7fe9-b692-b03e7b16a241",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-status-damage",
  title: "Status Damage",
  nodeId: "status-damage",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "subcategory-status-effects",
} as const satisfies TemperMetricTree
