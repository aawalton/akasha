import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const outcomeCardsCheckPlayer = {
  id: "01a17ffe-7d82-72d0-a638-e3485de06f50",
  type: "page-type/metric-character-mana",
  slug: "outcome-cards-check-player",
  character: "character-player/outcome-cards-check-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies MetricCharacterMana
