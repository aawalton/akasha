import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrial2NalaShadow = {
  id: "01a18dab-06cd-7a1c-8b86-aa89182567fe",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial2-nala-shadow",
  statGroup: "world-stat-group/gifted-trial2-world-affinities",
  title: "Shadow (Strong)",
  character: "character-player/gifted-trial2-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 6,
  revealedAs: "Strong",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies MetricCharacterStat
