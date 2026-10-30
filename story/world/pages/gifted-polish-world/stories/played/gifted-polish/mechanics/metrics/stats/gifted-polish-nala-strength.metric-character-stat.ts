import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedPolishNalaStrength = {
  id: "01a18e17-127d-7d27-b634-38012bd2cc42",
  type: "page-type/metric-character-stat",
  slug: "gifted-polish-nala-strength",
  statGroup: "world-stat-group/gifted-polish-world-basic-attributes",
  character: "character-player/gifted-polish-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 1,
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies MetricCharacterStat
