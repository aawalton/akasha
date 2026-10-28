import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const timeProbePlayerStrength = {
  id: "01a1802d-b13e-7584-8611-61be494fd990",
  type: "page-type/metric-character-stat",
  slug: "time-probe-player-strength",
  character: "character-player/time-probe-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterStat
