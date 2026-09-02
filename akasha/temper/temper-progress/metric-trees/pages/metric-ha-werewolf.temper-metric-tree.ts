import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricHaWerewolf = {
  id: "01a05fcc-d88a-76ef-954f-b64f950677f8",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-ha-werewolf",
  title: "Ha Werewolf",
  nodeId: "ha-werewolf",
  nodeType: "metric",
  displayOrder: 10,
  parent: "subcategory-ha-damage",
} as const satisfies TemperMetricTree
