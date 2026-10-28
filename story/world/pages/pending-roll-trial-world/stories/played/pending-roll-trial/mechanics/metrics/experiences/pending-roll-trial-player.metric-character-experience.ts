import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const pendingRollTrialPlayer = {
  id: "01a183cf-b828-7af2-be01-44728fa664b3",
  type: "page-type/metric-character-experience",
  slug: "pending-roll-trial-player",
  title: "Experience Points",
  character: "character-player/pending-roll-trial-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies MetricCharacterExperience
