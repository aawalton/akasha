import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricTargetWeaponPower = {
  id: "01a05fcc-d8ae-771e-9237-74c08d6dbb11",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-target-weapon-power",
  title: "Target Weapon Power",
  nodeId: "target-weapon-power",
  nodeType: "metric",
  displayOrder: 1,
  parent: "metric-target-power",
} as const satisfies TemperMetricTree
