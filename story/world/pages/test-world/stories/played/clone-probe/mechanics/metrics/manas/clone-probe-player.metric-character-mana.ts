import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f3e-4458-7fd9-b4a6-ce0fa4e0f3f8",
  type: "page-type/metric-character-mana",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies MetricCharacterMana
