import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const probeTwoPlayerWits = {
  id: "01a17fbf-aff5-70fa-8af5-229576f84861",
  type: "page-type/metric-character-stat",
  slug: "probe-two-player-wits",
  character: "character-player/probe-two-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterStat
