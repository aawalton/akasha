import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const undoCheckPlayerWits = {
  id: "01a18309-e114-7c75-943a-38fbdf157dfd",
  type: "page-type/metric-character-stat",
  slug: "undo-check-player-wits",
  character: "character-player/undo-check-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies MetricCharacterStat
