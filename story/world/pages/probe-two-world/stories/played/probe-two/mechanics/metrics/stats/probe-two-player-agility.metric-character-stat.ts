import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const probeTwoPlayerAgility = {
  id: "01a17fbf-aff5-73a0-b97f-f74950387a89",
  type: "page-type/metric-character-stat",
  slug: "probe-two-player-agility",
  character: "character-player/probe-two-player",
  value: 14,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterStat
