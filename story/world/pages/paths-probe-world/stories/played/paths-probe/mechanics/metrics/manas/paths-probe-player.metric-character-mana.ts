import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const pathsProbePlayer = {
  id: "01a18008-7533-7617-8839-abb063dd72cb",
  type: "page-type/metric-character-mana",
  slug: "paths-probe-player",
  character: "character-player/paths-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies MetricCharacterMana
