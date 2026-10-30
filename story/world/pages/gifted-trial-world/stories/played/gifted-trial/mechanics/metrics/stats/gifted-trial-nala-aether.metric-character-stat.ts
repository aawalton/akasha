import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrialNalaAether = {
  id: "01a18d10-93f1-7069-a700-82abe45da7be",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial-nala-aether",
  statGroup: "world-stat-group/gifted-trial-world-basic-attributes",
  character: "character-player/gifted-trial-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 5,
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies MetricCharacterStat
