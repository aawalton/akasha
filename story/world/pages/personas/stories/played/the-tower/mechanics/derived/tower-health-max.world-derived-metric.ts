import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerHealthMax = {
  id: "01a0ca34-6ce1-7b83-ba1b-68a26a42eba4",
  type: "page-type/world-derived-metric",
  slug: "tower-health-max",
  title: "Max Health",
  definition: "the most health a character in the Tower can have",
  formula: {},
  createdAt: "2026-09-22T17:40:28.513Z",
  updatedAt: "2026-09-26T14:54:15.000Z",
} as const satisfies WorldDerivedMetric
