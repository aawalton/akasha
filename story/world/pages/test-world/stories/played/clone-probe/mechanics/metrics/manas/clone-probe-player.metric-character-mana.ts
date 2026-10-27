import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f4c-d936-70e0-ac54-c9271fe4c3ef",
  type: "page-type/metric-character-mana",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies MetricCharacterMana
