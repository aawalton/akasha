import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHealingReceived = {
  id: "01a05fcc-d8b4-703a-b3e2-f1334958f536",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-healing-received",
  title: "Healing Received",
  nodeId: "healing-received",
  nodeType: "subcategory",
  displayOrder: 3,
  parent: "category-healing",
} as const satisfies TemperMetricTree
