import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const timeProbePlayerAgility = {
  id: "01a1802d-b13e-712b-ba1d-f66261542b8c",
  type: "page-type/metric-character-stat",
  slug: "time-probe-player-agility",
  character: "character-player/time-probe-player",
  value: 14,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterStat
