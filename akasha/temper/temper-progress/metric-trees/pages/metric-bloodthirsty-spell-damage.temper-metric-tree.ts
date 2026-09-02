import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricBloodthirstySpellDamage = {
  id: "01a05fcc-d86f-75cd-9b24-2d7d1f1785e6",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-bloodthirsty-spell-damage",
  title: "Bloodthirsty Spell Damage",
  nodeId: "bloodthirsty-spell-damage",
  nodeType: "metric",
  displayOrder: 1,
  parent: "subcategory-bloodthirsty",
} as const satisfies TemperMetricTree
