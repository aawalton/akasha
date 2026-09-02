import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingPower = {
  id: "01a05fcc-d8b4-702e-bfa4-a7b8773592a0",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-power",
  title: "Healing Power",
  nodeId: "healing-power",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "category-healing",
} as const satisfies TemperMetricTree
