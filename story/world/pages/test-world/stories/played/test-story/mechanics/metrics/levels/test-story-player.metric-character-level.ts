import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-9eb0-78c5-a231-b365260380ed",
  type: "page-type/metric-character-level",
  slug: "test-story-player",
  character: "character-player/test-story-player",
  value: 3,
  minValue: 1,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterLevel
