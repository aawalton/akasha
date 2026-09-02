import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPowerWeapon = {
  id: "01a05fcc-d89e-7702-997f-cef9327c6301",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-power-weapon",
  title: "Power Weapon",
  nodeId: "power-weapon",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-power",
} as const satisfies TemperMetricTree
