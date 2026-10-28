import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const outcomeCardTrialPlayer = {
  id: "01a183ae-dc71-7bc5-8f98-3da5609f136f",
  type: "page-type/metric-character-experience",
  slug: "outcome-card-trial-player",
  title: "Experience Points",
  character: "character-player/outcome-card-trial-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies MetricCharacterExperience
