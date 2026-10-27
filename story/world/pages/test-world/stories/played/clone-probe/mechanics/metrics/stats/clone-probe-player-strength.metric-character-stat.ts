import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const cloneProbePlayerStrength = {
  id: "01a17f4c-d936-7335-b51f-e82161583b25",
  type: "page-type/metric-character-stat",
  slug: "clone-probe-player-strength",
  character: "character-player/clone-probe-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies MetricCharacterStat
