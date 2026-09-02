import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneDungeon = {
  id: "01a05fcc-d876-7699-8af4-1e6d75d14559",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-dungeon",
  title: "Damage Done Dungeon",
  nodeId: "damage-done-dungeon",
  nodeType: "metric",
  displayOrder: 5,
  parent: "subcategory-damage-done",
} as const satisfies TemperMetricTree
