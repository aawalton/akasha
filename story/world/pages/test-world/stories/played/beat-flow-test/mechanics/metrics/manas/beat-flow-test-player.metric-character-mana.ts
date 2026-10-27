import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const beatFlowTestPlayer = {
  id: "01a17f7f-6e81-7de6-ba34-833c1ed2c0c3",
  type: "page-type/metric-character-mana",
  slug: "beat-flow-test-player",
  character: "character-player/beat-flow-test-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies MetricCharacterMana
