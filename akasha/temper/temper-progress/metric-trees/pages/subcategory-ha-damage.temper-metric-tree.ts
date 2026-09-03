import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const subcategoryHaDamage = {
  id: "019e2fcd-59b9-70c5-bfa3-9aee915a5d68",
  pageTypeSlug: "temper-metric-tree",
  slug: "subcategory-ha-damage",
  title: "HA Damage",
  nodeId: "ha-damage",
  nodeType: "subcategory",
  displayOrder: 1,
  parent: "subcategory-heavy-attacks",
} as const satisfies TemperMetricTree
