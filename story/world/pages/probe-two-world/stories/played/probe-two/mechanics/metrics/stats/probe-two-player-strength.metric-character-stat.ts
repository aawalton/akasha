import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const probeTwoPlayerStrength = {
  id: "01a17fbf-aff5-7cb9-a725-7dddecb61984",
  type: "page-type/metric-character-stat",
  slug: "probe-two-player-strength",
  character: "character-player/probe-two-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterStat
