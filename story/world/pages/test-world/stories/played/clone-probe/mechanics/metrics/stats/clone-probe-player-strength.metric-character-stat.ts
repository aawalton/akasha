import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const cloneProbePlayerStrength = {
  id: "01a17f3e-4458-7d83-8763-b969ab982f59",
  type: "page-type/metric-character-stat",
  slug: "clone-probe-player-strength",
  character: "character-player/clone-probe-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies MetricCharacterStat
