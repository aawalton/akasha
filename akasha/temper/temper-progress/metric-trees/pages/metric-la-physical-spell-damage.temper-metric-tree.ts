import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaPhysicalSpellDamage = {
  id: "01a05fcc-d892-7dfc-8ceb-67545797cc14",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-physical-spell-damage",
  title: "La Physical Spell Damage",
  nodeId: "la-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
