import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const testStoryPlayerAgility = {
  id: "01a17ec6-9eb0-7e27-9d45-9f289d4a3763",
  type: "page-type/metric-character-stat",
  slug: "test-story-player-agility",
  character: "character-player/test-story-player",
  value: 14,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterStat
