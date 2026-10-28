import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedRebornNalaAether = {
  id: "01a17ee1-2b6a-7881-b8ec-8befbe795294",
  type: "page-type/metric-character-stat",
  slug: "gifted-reborn-nala-aether",
  statGroup: "world-stat-group/gifted-basic-attributes",
  character: "character-player/gifted-reborn-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 5,
  createdAt: "2026-10-27T19:40:48.360Z",
  updatedAt: "2026-10-28T14:53:24.183Z",
} as const satisfies MetricCharacterStat
