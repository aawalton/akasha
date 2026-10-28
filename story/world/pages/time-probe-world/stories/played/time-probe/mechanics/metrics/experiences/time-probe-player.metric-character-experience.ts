import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const timeProbePlayer = {
  id: "01a1802d-b13e-704f-91ad-cdc93dfff495",
  type: "page-type/metric-character-experience",
  slug: "time-probe-player",
  title: "Experience Points",
  character: "character-player/time-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterExperience
