import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricDamageDoneShock = {
  id: "019e2fcd-598d-7498-a433-c406faf8c35f",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-damage-done-shock",
  title: "Damage Done Shock",
  nodeId: "damage-done-shock",
  nodeType: "metric",
  displayOrder: 9,
  parent: "subcategory-damage-done-by-type",
} as const satisfies TemperMetricTree
