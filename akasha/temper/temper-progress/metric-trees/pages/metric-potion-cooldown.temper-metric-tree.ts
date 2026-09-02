import type { TemperMetricTree } from "../temper-metric-tree.page-type.ts"

export const metricPotionCooldown = {
  id: "01a05fcc-d89d-7c75-85ca-6dda523d344c",
  pageTypeSlug: "temper-metric-tree",
  slug: "metric-potion-cooldown",
  title: "Potion Cooldown",
  nodeId: "potion-cooldown",
  nodeType: "metric",
  displayOrder: 0,
  parent: "subcategory-potions",
} as const satisfies TemperMetricTree
