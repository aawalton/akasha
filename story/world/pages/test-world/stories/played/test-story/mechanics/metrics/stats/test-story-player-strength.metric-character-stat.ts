import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const testStoryPlayerStrength = {
  id: "01a17ec6-9eb0-7c29-8551-ff304b0fe766",
  type: "page-type/metric-character-stat",
  slug: "test-story-player-strength",
  character: "character-player/test-story-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterStat
