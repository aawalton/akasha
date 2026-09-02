import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricCriticalRatingWeapon = {
  id: "01a05fcc-d874-7401-9356-b556dec279a9",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-critical-rating-weapon",
  title: "Critical Rating Weapon",
  nodeId: "critical-rating-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-critical-rating",
} as const satisfies TemperMetricTree
