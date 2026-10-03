import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export const towerAndTheStarResonanceEvents = {
  id: "01a1033f-b3b5-7fec-8386-78b89b9f70cb",
  type: "page-type/world-metric",
  slug: "tower-and-the-star-resonance-events",
  title: "Resonance Events",
  world: "world/tower-and-the-star",
  description: "The party's Resonance Events, counted toward the Six of Six threshold.",
  value: 150,
  minValue: 0,
  maxValue: 150,
} as const satisfies WorldMetric
