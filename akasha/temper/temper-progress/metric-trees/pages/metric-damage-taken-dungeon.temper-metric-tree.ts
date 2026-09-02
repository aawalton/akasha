import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenDungeon = {
  id: "01a05fcc-d87b-72b8-bd66-606eec77dfda",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-dungeon",
  title: "Damage Taken Dungeon",
  nodeId: "damage-taken-dungeon",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-taken",
} as const satisfies TemperMetricTree
