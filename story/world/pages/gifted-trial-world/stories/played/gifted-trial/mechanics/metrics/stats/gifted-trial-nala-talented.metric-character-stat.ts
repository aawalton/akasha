import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrialNalaTalented = {
  id: "01a18d10-93f1-79d6-b304-532551421505",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial-nala-talented",
  statGroup: "world-stat-group/gifted-trial-world-advanced-attributes",
  title: "Talented",
  character: "character-player/gifted-trial-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 7,
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies MetricCharacterStat
