import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const pathsProbePlayer = {
  id: "01a18008-7533-7a3b-bf88-93133e947515",
  type: "page-type/metric-character-experience",
  slug: "paths-probe-player",
  title: "Experience Points",
  character: "character-player/paths-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies MetricCharacterExperience
