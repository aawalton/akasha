import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const memoCheckPlayer = {
  id: "01a1832d-38c0-703b-93c3-6ed246fccc1a",
  type: "page-type/metric-character-mana",
  slug: "memo-check-player",
  character: "character-player/memo-check-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies MetricCharacterMana
