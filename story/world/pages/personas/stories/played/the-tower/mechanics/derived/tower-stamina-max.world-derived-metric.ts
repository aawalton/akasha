import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerStaminaMax = {
  id: "01a0ca36-ec2c-7d9c-b807-01528dfacc3b",
  type: "page-type/world-derived-metric",
  slug: "tower-stamina-max",
  title: "Max Stamina",
  definition: "the most effort a character in the Tower can spend",
  formula: {},
  createdAt: "2026-09-22T17:43:12.172Z",
  updatedAt: "2026-09-26T14:54:15.000Z",
} as const satisfies WorldDerivedMetric
