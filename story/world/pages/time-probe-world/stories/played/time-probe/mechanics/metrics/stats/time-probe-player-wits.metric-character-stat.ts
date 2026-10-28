import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const timeProbePlayerWits = {
  id: "01a1802d-b13e-70a7-91ee-472797c73421",
  type: "page-type/metric-character-stat",
  slug: "time-probe-player-wits",
  character: "character-player/time-probe-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterStat
