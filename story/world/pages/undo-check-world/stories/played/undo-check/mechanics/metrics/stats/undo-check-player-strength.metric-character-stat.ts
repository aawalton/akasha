import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const undoCheckPlayerStrength = {
  id: "01a18309-e114-71ea-b6c9-b5b384d18dd5",
  type: "page-type/metric-character-stat",
  slug: "undo-check-player-strength",
  character: "character-player/undo-check-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:06:04.323Z",
} as const satisfies MetricCharacterStat
