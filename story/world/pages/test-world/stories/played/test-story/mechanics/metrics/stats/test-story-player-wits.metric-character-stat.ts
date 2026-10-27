import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const testStoryPlayerWits = {
  id: "01a17ec6-9eb0-7881-8223-fbb7c79cbd8d",
  type: "page-type/metric-character-stat",
  slug: "test-story-player-wits",
  character: "character-player/test-story-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterStat
