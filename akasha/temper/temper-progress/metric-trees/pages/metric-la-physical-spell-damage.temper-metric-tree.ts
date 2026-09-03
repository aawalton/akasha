import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaPhysicalSpellDamage = {
  id: "019e2fcd-5996-749a-be02-c6ba466b42a1",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-physical-spell-damage",
  title: "La Physical Spell Damage",
  nodeId: "la-physical-spell-damage",
  nodeType: "metric",
  displayOrder: 6,
  parent: "subcategory-la-power",
} as const satisfies TemperMetricTree
