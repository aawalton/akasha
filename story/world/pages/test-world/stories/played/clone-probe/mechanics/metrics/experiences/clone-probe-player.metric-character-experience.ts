import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f4c-d936-7dae-90b6-7bd7e0787fc2",
  type: "page-type/metric-character-experience",
  slug: "clone-probe-player",
  title: "Experience Points",
  character: "character-player/clone-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies MetricCharacterExperience
