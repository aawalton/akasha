import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const probeTwoPlayer = {
  id: "01a17fbf-aff5-749d-90bf-c973d1cc5a38",
  type: "page-type/metric-character-experience",
  slug: "probe-two-player",
  title: "Experience Points",
  character: "character-player/probe-two-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterExperience
