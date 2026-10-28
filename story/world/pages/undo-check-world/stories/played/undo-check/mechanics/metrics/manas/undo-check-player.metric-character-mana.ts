import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const undoCheckPlayer = {
  id: "01a18309-e114-7b04-ac9f-d7d4c869f1e3",
  type: "page-type/metric-character-mana",
  slug: "undo-check-player",
  character: "character-player/undo-check-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies MetricCharacterMana
