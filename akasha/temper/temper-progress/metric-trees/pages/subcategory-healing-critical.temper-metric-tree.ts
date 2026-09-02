import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingCritical = {
  id: "01a05fcc-d8b4-7656-b433-6da046feba52",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-critical",
  title: "Healing Critical",
  nodeId: "healing-critical",
  nodeType: "subcategory",
  displayOrder: 2,
  parent: "category-healing",
} as const satisfies TemperMetricTree
