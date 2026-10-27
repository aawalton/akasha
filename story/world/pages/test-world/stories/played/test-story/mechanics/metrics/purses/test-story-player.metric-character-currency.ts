import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-9eb0-76cc-b84c-9eb152eb7774",
  type: "page-type/metric-character-currency",
  slug: "test-story-player",
  character: "character-player/test-story-player",
  currency: "world-currency/test-world-coin",
  value: 39,
  minValue: 0,
  history: "jsonl",
  createdAt: "2026-10-27T19:11:48.398Z",
  updatedAt: "2026-10-27T20:25:37.851Z",
} as const satisfies MetricCharacterCurrency
