import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerPhysicalAttack = {
  id: "01a0ca38-0c53-7bd0-83e5-92626d964fcc",
  type: "page-type/world-derived-metric",
  slug: "tower-physical-attack",
  title: "Physical Attack",
  definition: "how hard a character in the Tower strikes with a weapon",
  formula: {},
} as const satisfies WorldDerivedMetric
