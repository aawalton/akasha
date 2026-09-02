import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricLaWerewolf = {
  id: "01a05fcc-d895-7386-b037-37b94034c8ad",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-la-werewolf",
  title: "La Werewolf",
  nodeId: "la-werewolf",
  nodeType: "metric",
  displayOrder: 10,
  parent: "subcategory-la-damage",
} as const satisfies TemperMetricTree
