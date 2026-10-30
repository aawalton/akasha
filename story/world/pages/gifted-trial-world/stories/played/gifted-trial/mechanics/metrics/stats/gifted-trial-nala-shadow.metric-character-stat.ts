import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrialNalaShadow = {
  id: "01a18d10-93f1-7579-ab55-e905d3852c8b",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial-nala-shadow",
  statGroup: "world-stat-group/gifted-trial-world-affinities",
  title: "Shadow (Strong)",
  character: "character-player/gifted-trial-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 6,
  revealedAs: "Strong",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies MetricCharacterStat
