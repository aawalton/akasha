import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const pendingRollTrialPlayer = {
  id: "01a183cf-b828-7de3-9a6a-2560468d1a07",
  type: "page-type/metric-character-mana",
  slug: "pending-roll-trial-player",
  character: "character-player/pending-roll-trial-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies MetricCharacterMana
