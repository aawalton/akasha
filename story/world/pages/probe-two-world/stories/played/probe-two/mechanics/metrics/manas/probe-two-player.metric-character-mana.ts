import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const probeTwoPlayer = {
  id: "01a17fbf-aff5-71b3-8480-20cde356b8a0",
  type: "page-type/metric-character-mana",
  slug: "probe-two-player",
  character: "character-player/probe-two-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterMana
