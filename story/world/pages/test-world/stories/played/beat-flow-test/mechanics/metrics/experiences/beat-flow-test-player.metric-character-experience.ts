import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const beatFlowTestPlayer = {
  id: "01a17f7f-6e81-75b0-9832-51b60bfc2553",
  type: "page-type/metric-character-experience",
  slug: "beat-flow-test-player",
  title: "Experience Points",
  character: "character-player/beat-flow-test-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies MetricCharacterExperience
