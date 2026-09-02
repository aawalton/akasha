import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHaDamage = {
  id: "01a05fcc-d8b3-764a-8d57-fcb90c7cf13d",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-ha-damage",
  title: "HA Damage",
  nodeId: "ha-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
