import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-9eaf-768f-b5d0-4a37a58f65de",
  type: "page-type/metric-character-experience",
  slug: "test-story-player",
  title: "Experience Points",
  character: "character-player/test-story-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterExperience
