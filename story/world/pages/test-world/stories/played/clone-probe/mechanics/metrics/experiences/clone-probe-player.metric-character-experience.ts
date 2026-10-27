import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f3e-4458-7723-b168-956930c99faf",
  type: "page-type/metric-character-experience",
  slug: "clone-probe-player",
  title: "Experience Points",
  character: "character-player/clone-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies MetricCharacterExperience
