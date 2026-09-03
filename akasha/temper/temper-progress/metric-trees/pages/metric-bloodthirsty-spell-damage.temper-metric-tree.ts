import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBloodthirstySpellDamage = {
  id: "019e2fcd-59ec-7e2b-a73f-1c44fafcf76a",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bloodthirsty-spell-damage",
  title: "Bloodthirsty Spell Damage",
  nodeId: "bloodthirsty-spell-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
