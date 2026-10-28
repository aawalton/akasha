import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const undoCheckPlayer = {
  id: "01a18309-e114-7ce0-8652-15834dd0b5b5",
  type: "page-type/metric-character-currency",
  slug: "undo-check-player",
  character: "character-player/undo-check-player",
  currency: "world-currency/undo-check-world-coin",
  value: 16,
  minValue: 0,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:05:06.135Z",
} as const satisfies MetricCharacterCurrency
