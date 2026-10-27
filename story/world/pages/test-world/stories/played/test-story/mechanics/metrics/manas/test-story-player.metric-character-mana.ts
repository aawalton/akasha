import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-9eb0-78bf-9054-199a73638090",
  type: "page-type/metric-character-mana",
  slug: "test-story-player",
  character: "character-player/test-story-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T19:11:48.398Z",
} as const satisfies MetricCharacterMana
