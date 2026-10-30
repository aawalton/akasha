import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedPolishNalaShadow = {
  id: "01a18e17-127d-7c52-8ce7-edea6d4329d4",
  type: "page-type/metric-character-stat",
  slug: "gifted-polish-nala-shadow",
  statGroup: "world-stat-group/gifted-polish-world-affinities",
  title: "Shadow (Strong)",
  character: "character-player/gifted-polish-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 6,
  revealedAs: "Strong",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies MetricCharacterStat
