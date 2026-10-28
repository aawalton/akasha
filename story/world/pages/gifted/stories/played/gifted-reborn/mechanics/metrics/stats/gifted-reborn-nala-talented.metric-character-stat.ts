import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedRebornNalaTalented = {
  id: "01a182eb-e734-7e79-b526-3c0fb695b556",
  type: "page-type/metric-character-stat",
  slug: "gifted-reborn-nala-talented",
  statGroup: "world-stat-group/gifted-advanced-attributes",
  title: "Talented",
  character: "character-player/gifted-reborn-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 7,
  createdAt: "2026-10-28T14:31:00.657Z",
  updatedAt: "2026-10-28T15:31:37.647Z",
} as const satisfies MetricCharacterStat
