import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageTakenLa = {
  id: "01a05fcc-d87c-7e8b-b434-8f869c1ffbee",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-taken-la",
  title: "Damage Taken La",
  nodeId: "damage-taken-la",
  nodeType: "metric",
  displayOrder: 3,
  parent: "subcategory-damage-taken-by-type",
} as const satisfies TemperMetricTree
