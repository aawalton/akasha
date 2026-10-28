import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const memoCheckPlayerWits = {
  id: "01a1832d-38c0-742c-8bad-0a01eb74249c",
  type: "page-type/metric-character-stat",
  slug: "memo-check-player-wits",
  character: "character-player/memo-check-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies MetricCharacterStat
