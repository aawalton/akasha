import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricEffectiveHealthSpell = {
  id: "01a05fcc-d880-7b84-a592-f460eb53756f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-effective-health-spell",
  title: "Effective Health Spell",
  nodeId: "effective-health-spell",
  nodeType: "metric",
  displayOrder: 1,
  parent: "category-toughness",
  useAccentColor: true,
} as const satisfies TemperMetricTree
