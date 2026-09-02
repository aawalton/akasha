import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingDone = {
  id: "01a05fcc-d8b4-7b10-aaf3-49de9c5514db",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-done",
  title: "Healing Done",
  nodeId: "healing-done",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "category-healing",
} as const satisfies TemperMetricTree
