import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedRebornNalaMental = {
  id: "01a17ee1-2b6a-7f73-b987-f710bc264885",
  type: "page-type/metric-character-stat",
  slug: "gifted-reborn-nala-mental",
  statGroup: "world-stat-group/gifted-basic-attributes",
  character: "character-player/gifted-reborn-nala",
  value: 101,
  minValue: 0,
  history: "jsonl",
  unrevealed: false,
  displayOrder: 4,
  createdAt: "2026-10-27T19:40:48.360Z",
  updatedAt: "2026-10-28T15:06:42.997Z",
} as const satisfies MetricCharacterStat
