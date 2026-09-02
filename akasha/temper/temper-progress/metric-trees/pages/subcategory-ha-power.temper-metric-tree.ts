import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHaPower = {
  id: "01a05fcc-d8b3-7e14-865c-5b420ea72c48",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-ha-power",
  title: "HA Power",
  nodeId: "ha-power",
  nodeType: "subcategory",
  displayOrder: 0,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
