import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const outcomeCardsCheckPlayer = {
  id: "01a17ffe-7d82-7647-94b5-05e58594f65a",
  type: "page-type/metric-character-experience",
  slug: "outcome-cards-check-player",
  title: "Experience Points",
  character: "character-player/outcome-cards-check-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies MetricCharacterExperience
