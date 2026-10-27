import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-9eaf-7b0b-8053-c85cc6cd59a0",
  type: "page-type/metric-character-health",
  slug: "test-story-player",
  character: "character-player/test-story-player",
  value: 24,
  minValue: 0,
  maxValue: 24,
  history: "jsonl",
  displayOrder: 1,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T20:13:20.792Z",
} as const satisfies MetricCharacterHealth
